import { useQuery } from "@tanstack/react-query";
import { getPlans } from "../api/plan.api";
import type { PlansResponse } from "../types";

export const usePlans = () => {
  return useQuery<PlansResponse>({
    queryKey: ["plans"],
    queryFn: () => getPlans({ page: 1, limit: 10 }),
  });
};
