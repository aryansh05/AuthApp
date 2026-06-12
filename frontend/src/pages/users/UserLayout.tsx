import useUserLayout from "@/logic/useUserLayout";
import { Navigate, Outlet } from "react-router";

function UserLayout() {
  const {checkLogin} = useUserLayout();

  if(checkLogin()){
    return (
      <div>
        <Outlet />
      </div>
    )
  }else return <Navigate to="/login"/>
}

export default UserLayout;