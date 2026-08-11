import axios from "axios";
import type { AuthUser, LoginCredentials, RegisterCredentials } from "../types/auth";

const TOKEN_KEY = "supportai.auth.token";

const authApi = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);

export const storeToken = (token: string, remember: boolean) => {
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
  (remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, token);
};

export const clearStoredToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
};

authApi.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

interface ApiResponse {
  success: boolean;
  message?: string;
  user: AuthUser;
}

interface LoginResponse extends ApiResponse {
  token: string;
}

const getErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (axios.isAxiosError(error)) {
    const responseMessage = (error.response?.data as { message?: unknown } | undefined)?.message;

    if (typeof responseMessage === "string") {
      return responseMessage;
    }

    if (!error.response) {
      return "Unable to reach the server. Please try again.";
    }
  }

  return fallbackMessage;
};

export const login = async (credentials: LoginCredentials) => {
  try {
    const { data } = await authApi.post<LoginResponse>("/login", credentials);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Login failed. Please try again."));
  }
};

export const register = async (credentials: RegisterCredentials) => {
  try {
    const { data } = await authApi.post<ApiResponse>("/register", credentials);
    return data.user;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Registration failed. Please try again."));
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await authApi.get<ApiResponse>("/me");
    return data.user;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Unable to restore your session."));
  }
};

