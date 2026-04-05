import API from "./api";

export const generatePlan = async (data: {
  goal: string;
  level: string;
  days: number;
}) => {
  const res = await API.post("/api/plans/generate-plan", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || "DEV_TOKEN"}`,
    },
  });
  console.log("API Response:", res.data);
  return res.data;
};

export const getPlans = async (params?: { page?: number; limit?: number }) => {
  const res = await API.get("/api/plans", {
    params,
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem("token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMjI3NWY0NC0yOWY0LTRkYzUtYWQwNC0xY2EyZDI0YmNlNGIiLCJpYXQiOjE3NzUzNjU3OTYsImV4cCI6MTc3NTM2OTM5Nn0.hfoyE1sRCElv4irH2uE_1JOA-bpxCNqQhzxj__feX7I"
      }`,
    },
  });

  return res.data;
};