import API from "./api";

export const generatePlan = async (data: {
  goal: string;
  level: string;
  days: number;
}) => {
  const res = await API.post("/api/plans/generate-plan", data, {
    headers: {
    //   Authorization: `Bearer ${localStorage.getItem("token")}`,
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMjI3NWY0NC0yOWY0LTRkYzUtYWQwNC0xY2EyZDI0YmNlNGIiLCJpYXQiOjE3NzUyODQ2MTksImV4cCI6MTc3NTI4ODIxOX0.f6AWlrcXeqv1BKOorgjMDyOfL2mEQ1gueyNk-XY5tlw`,
    },
  });
console.log("API Response:", res.data);
  return res.data;
};
