import apiClient from "@/config/apiClient";
import type LoginData from "@/models/loginData";
import type LoginResponseData from "@/models/loginResponseData";
import type RegisterData from "@/models/regiserData";
import type User from "@/models/user";

export const registerUser = async (signupData: RegisterData) => {
  const response = await apiClient.post(`/auth/register`, signupData);
  return response.data;
};


export const loginUser = async (loginData: LoginData) => {
  const response = await apiClient.post<LoginResponseData>(
    "/auth/login",
    loginData
  );
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post(`/auth/logout`);
  return response.data;
};

export const getCurrentUser = async (emailId: string | undefined) => {
  const response = await apiClient.get<User>(`/users/email/${emailId}`);
  return response.data;
};

export const refreshToken = async () => {
  const response = await apiClient.post<LoginResponseData>(`/auth/refresh`);
  return response.data;
};
