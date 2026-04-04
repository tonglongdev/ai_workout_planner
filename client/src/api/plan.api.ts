import axios from "axios";

export const generatePlan = async (data: {
  goal: string;
  level: string;
  days: number;
}) => {
  const res = await axios.post("/api/plans/generate-plan", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.data;
};
