import { Router } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

const authRoutes = Router();

authRoutes.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. validate
    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password too short" });
    }

    // 2. check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    const { password: _, ...userWithoutPassword } = user;

    return res.json({
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default authRoutes;
