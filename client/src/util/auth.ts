import { getAccessToken } from "../api/token.service";

export const isAuthenticated = () => {
  return !!getAccessToken();
};