import API from "../api/axios";

export const getMe = async () => {
  const res = await API.get("/api/user/me");
  return res.data;
};