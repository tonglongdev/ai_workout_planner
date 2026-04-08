import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/user";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
};
