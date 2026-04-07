import type { AxiosError, AxiosRequestConfig } from "axios";
import API from "./axios";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "./token.service";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

type FailedRequest = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

export const setupInterceptors = () => {
  API.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  API.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (originalRequest?.url === "/api/auth/refresh") {
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise<string | null>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return API(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const res = await API.post("/api/auth/refresh", {
            refreshToken: getRefreshToken(),
          });

          const newAccessToken = (res.data as { accessToken: string })
            .accessToken;

          setAccessToken(newAccessToken);

          processQueue(null, newAccessToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          return API(originalRequest);
        } catch (err) {
          processQueue(err, null);

          clearTokens();
          window.location.href = "/login";

          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
};
