import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

export default function App() {
   return (
      <>
         <div className="app-container bg-slate-400 dark:bg-primaryDark dark: text-textDark ">
            <NavBar />
            <Outlet />
         </div>
      </>
   );
}
