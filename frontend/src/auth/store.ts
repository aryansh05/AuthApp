import type LoginData from "@/models/loginData";
import type LoginResponseData from "@/models/loginResponseData";
import type User from "@/models/user";
import { loginUser, logoutUser } from "@/services/authService";
import {create} from "zustand";
import { persist } from "zustand/middleware";

const TOKEN_KEY =  "AuthApp";

type AuthState = {
  accessToken: string | null;
  user: User | null;
  authStatus: boolean;
  authLoading: boolean;
  login: (loginData: LoginData) => Promise<LoginResponseData>;
  logout: (silent?: boolean) => void;
  checkLogin: () => boolean | undefined;

  changeLocalLoginData: (
    accessToken: string,
    user: User,
    authStatus: boolean
  ) => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      authStatus: false,
      authLoading: false,

      changeLocalLoginData: (accessToken, user, authStatus) => {
        set({
          accessToken,
          user,
          authStatus,
        });
      },
        login: async (LoginData) => {
        console.log("started login...");
        set({ authLoading: true });
        try {
          const loginResponseData = await loginUser(LoginData);
          console.log(loginResponseData);
          set({
            accessToken: loginResponseData.accessToken,
            user: loginResponseData.user,
            authStatus: true,
          });
          return loginResponseData;
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          set({
            authLoading: false,
          });
        }
      },
      logout: async () => {
        try {
          set({
            authLoading: true,
          });
          await logoutUser();
        } catch (error) {
        } finally {
          set({
            authLoading: false,
          });
        }
        set({
          accessToken: null,
          user: null,
          authLoading: false,
          authStatus: false,
        });
      },
      checkLogin: () => {
        if (get().accessToken && get().authStatus) return true;
        else false;
      },
    }),

    { name: TOKEN_KEY }
  )
);
