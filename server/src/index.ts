import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.route";
import planRoutes from "./routes/plan.route";
import userRoutes from "./routes/user.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/plans", planRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
