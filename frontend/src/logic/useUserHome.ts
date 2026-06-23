import { useAuth } from "@/auth/store";
import { getCurrentUser } from "@/services/authService";
import { useState } from "react";
import type UserT from "@/models/user";
import toast from "react-hot-toast";

function useUserHome() {

    const user = useAuth(state => state.user);
    const logout = useAuth(state => state.logout);

    const [user1, setUser1] = useState<UserT | null>(null);

    const getUserData = async () => {
    try {
      const user1 = await getCurrentUser(user?.email);

      setUser1(user1);
      toast.success("you are able to access secured apis")
    } catch (error) {
      console.log(error);
      toast.error("error in getting data");
    }
  };

    return {
        user,
        logout,
        getUserData,
        user1
    };
}

export default useUserHome;