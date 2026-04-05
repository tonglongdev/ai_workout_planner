import type { PlansResponse } from "../types";
import API from "./api";

export const generatePlan = async (data: {
  goal: string;
  level: string;
  days: number;
}) => {
  const res = await API.post("/api/plans/generate-plan", data);
  return res.data;
};

export const getPlans = async (params?: {
  page?: number;
  limit?: number;
}): Promise<PlansResponse> => {
  const res = await API.get("/api/plans", { params });
  return res.data;
};
