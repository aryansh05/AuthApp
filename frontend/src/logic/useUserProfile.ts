import { useAuth } from "@/auth/store";
import type Roles from "@/models/roles";

export const formatRoles = (roles?: Roles[]) => {
  if (!roles?.length) {
    return "N/A";
  }

  return roles
    .map(role =>
      role.name
        .replace("ROLE_", "")
        .toLowerCase()
        .replace(/^./, char => char.toUpperCase())
    )
    .join(", ");
};

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