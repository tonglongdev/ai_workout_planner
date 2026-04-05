import { useMutation } from "@tanstack/react-query";
import { generatePlan } from "../api/plan.api";
import type { WorkoutDay } from "../types";

type PlanResponse = {
  id: string;
  planJson: {
    title: string;
    days: WorkoutDay[];
  };
};

export const useGeneratePlan = () => {
  return useMutation<PlanResponse, Error, { goal: string; level: string; days: number }>({
    mutationFn: generatePlan,
  });
};