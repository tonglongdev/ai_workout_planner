import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware";

const planRoutes = Router();

planRoutes.post("/generate", authMiddleware, async (req: AuthRequest, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Missing request body" });
    }

    const { goal, days } = req.body;

    if (!goal || !days) {
      return res.status(400).json({ message: "Missing goal or days" });
    }

    // fake plan
    const fakePlan = {
      goal,
      days: [
        {
          day: "Day 1",
          exercises: ["Bench Press", "Push Up"],
        },
      ],
    };

    // save DB
    const savedPlan = await prisma.trainingPlan.create({
      data: {
        userId: req.user!.userId,
        planJson: fakePlan,
        planText: JSON.stringify(fakePlan),
      },
    });

    return res.json({
      data: { message: "Plan created", plan: savedPlan },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error generating plan" });
  }
});

export default planRoutes;
