import apiClient from "@/config/ApiClient";
import type LoginData from "@/models/LoginData";
import type RegisterData from "@/models/RegiserData";

export const registerUser = async (signupData: RegisterData) => {
  const response = await apiClient.post(`/auth/register`, signupData);
  return response.data;
};


export const loginUser = async (loginData: LoginData) => {
  const response = await apiClient.post(`/auth/login`, loginData);
  return response.data;
};