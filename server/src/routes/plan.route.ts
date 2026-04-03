import { Router } from "express";
import OpenAI from "openai";
import { prisma } from "../lib/prisma";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware";
import * as z from "zod";

const planRoutes = Router();
const openai = new OpenAI();
const planSchema = z.object({
  title: z.string(),
  days: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      exercises: z.array(
        z.object({
          name: z.string(),
          sets: z.number(),
          reps: z.string(),
        }),
      ),
    }),
  ),
});

async function generatePlanWithRetry({
  goal,
  level,
  days,
  maxRetries = 2,
}: {
  goal: string;
  level: string;
  days: number;
  maxRetries?: number;
}) {
  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    console.log(`Attempt ${attempt + 1}/${maxRetries + 1}`);
    try {
      const prompt = `
You are a professional fitness coach.

Generate a workout plan in JSON format.

User info:
- Goal: ${goal}
- Level: ${level}
- Days per week: ${days}

Return ONLY valid JSON with this structure:
{
  "title": string,
  "days": [
    {
      "day": number,
      "focus": string,
      "exercises": [
        {
          "name": string,
          "sets": number,
          "reps": string
        }
      ]
    }
  ]
}
`;

      const completion = await openai.chat.completions.create({
        model: "gpt-5.4-nano",
        messages: [
          { role: "system", content: "You are a fitness coach." },
          { role: "user", content: prompt },
        ],
      });

      const content = completion.choices[0].message.content;

      if (!content) throw new Error("Empty AI response");

      // parse
      const parsed = JSON.parse(content);

      // validate
      const result = planSchema.safeParse(parsed);

      if (!result.success) {
        throw new Error("Invalid schema");
      }

      // ✅ SUCCESS
      return {
        json: result.data,
        text: content,
      };
    } catch (err) {
      lastError = err;

      console.log(`❌ Attempt ${attempt + 1} failed`, err);

      if (attempt === maxRetries) {
        throw lastError;
      }
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

planRoutes.get("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const plans = await prisma.trainingPlan.findMany({
      where: { userId: req.user!.userId },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        planJson: true,
        createdAt: true,
      },
    });

    return res.json({
      plans,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error getting plan" });
  }
});

planRoutes.get("/:id", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing id" });
    }

    const plan = await prisma.trainingPlan.findFirst({
      where: {
        id: id as string,
        userId: req.user!.userId,
      },
      select: {
        id: true,
        planJson: true,
        planText: true,
        createdAt: true,
      },
    });
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    return res.json({
      plan,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error getting plan" });
  }
});

planRoutes.post(
  "/generate-plan",
  authMiddleware,
  async (req: AuthRequest, res) => {
    try {
      const { goal, level, days } = req.body;

      if (!goal || !level || !days) {
        return res.status(400).json({ message: "Missing fields" });
      }

      const result = await generatePlanWithRetry({
        goal,
        level,
        days,
        maxRetries: 2,
      });

      const plan = await prisma.trainingPlan.create({
        data: {
          userId: req.user!.userId,
          planJson: result!.json,
          planText: result!.text,
        },
      });

      res.json(plan);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Failed to generate plan after retries",
      });
    }
  },
);

export default planRoutes;
