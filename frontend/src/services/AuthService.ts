import apiClient from "@/config/apiClient";
import type LoginData from "@/models/loginData";
import type LoginResponseData from "@/models/loginResponseData";
import type RegisterData from "@/models/regiserData";

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
