import type User from "./user";

export default interface LoginResponseData {
  
  accessToken: string;
  user: User;
  refreshToken: string;
  expiresIn: number;

}