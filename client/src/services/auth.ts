import API from "../api/axios";

export const login = async (data: { email: string; password: string }) => {
  try {
    const res = await API.post("/api/auth/login", data);
    localStorage.setItem("accessToken", res.data.meta.accessToken);
    localStorage.setItem("refreshToken", res.data.meta.refreshToken);

    return res.data; // expect { token }
  } catch (error) {
    throw new Error(
      "Login failed" + (error instanceof Error ? `: ${error.message}` : ""),
    );
  }
};

export const register = async (data: { email: string; password: string }) => {
  try {
    const res = await API.post("/api/auth/register", data);

    return res.data;
  } catch (error) {
    throw new Error(
      "Register failed" + (error instanceof Error ? `: ${error.message}` : ""),
    );
  }
};
