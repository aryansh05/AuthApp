import { useAuth } from "@/auth/store";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function useNavbar() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  const checkLogin = useAuth(state => state.checkLogin);
  const user = useAuth(state => state.user);
  const logout = useAuth(state => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return { isDark, toggleTheme, checkLogin, user, logout, navigate };
}


export default useNavbar;