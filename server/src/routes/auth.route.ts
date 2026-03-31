import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

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

authRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. validate
    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // 2. check existing user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4. generate token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    // 5. return user and token
    const { password: _, ...userWithoutPassword } = user;

    return res.json({
      data: userWithoutPassword,
      meta: {
        accessToken: token,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default authRoutes;
