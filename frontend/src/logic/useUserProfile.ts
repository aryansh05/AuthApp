import { useAuth } from "@/auth/store";

function useUserProfile() {
    const user = useAuth(state => state.user);

    const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";
    return {
        user,
        initials
    };
}

export default useUserProfile;