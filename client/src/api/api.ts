import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMjI3NWY0NC0yOWY0LTRkYzUtYWQwNC0xY2EyZDI0YmNlNGIiLCJpYXQiOjE3NzUzNjU3OTYsImV4cCI6MTc3NTM2OTM5Nn0.hfoyE1sRCElv4irH2uE_1JOA-bpxCNqQhzxj__feX7I";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
