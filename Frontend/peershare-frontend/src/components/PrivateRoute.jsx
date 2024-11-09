import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../auth/authentication";

export default function PrivateRoute() {
   return isAuthenticated() ? <Outlet /> : <Navigate to={"/sign-in"} />;
}
