import CanvasBackground from "../components/CanvasBackground";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import { useSelector } from "react-redux";
import { accessTokenSelector } from "../features/auth/authSlice";
import { Navigate, Outlet, useLocation } from "react-router";

function Dashboard() {
   const location = useLocation();
   const accessToken = useSelector(accessTokenSelector);
   return (
      <>
         <CanvasBackground isMouseLine={false} />
         <div className="absolute top-0 ps-16 sm:ps-0 grid sm:grid-cols-[auto_1fr] h-full w-full grid-rows-[64px_auto]">
            <SideBar />
            <TopBar />
            <div className="main-content p-4 sm:p-8 overflow-y-scroll overflow-x-hidden">
               {accessToken ? <Outlet /> : <Navigate to="/sign-in" state={{ from: location }} replace />}
            </div>
         </div>
      </>
   );
}

export default Dashboard;
