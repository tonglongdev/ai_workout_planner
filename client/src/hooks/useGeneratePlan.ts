import { useMutation } from "@tanstack/react-query";
import { generatePlan } from "../api/plan.api";

export const useGeneratePlan = () => {
  return useMutation({
    mutationFn: generatePlan,
  });
};