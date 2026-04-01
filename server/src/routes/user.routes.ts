import { Response, Router } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, (req: AuthRequest, res: Response) => {
  res.json({
    message: "User data fetched",
    user: req.user,
  });
});

router.get("/profile", authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(user);
});

export default router;
