import { useNavigate } from "react-router";
import { doUnAuthentication } from "../auth/authentication";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

function TopBar() {
   const navigate = useNavigate();
   const clickHandler = () => {
      doUnAuthentication();
      toast.info("Signed Out Successfully !");
      navigate("/");
   };
   return (
      <div className="backdrop-blur-md w-full p-4 dark:text-white dark:bg-transparent flex justify-end items-center px-4 border-2 border-l-0 border-slate-500 gap-4">
         <div
            onClick={clickHandler}
            className="text-white cursor-pointer bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Sign Out
         </div>
         <FaUserCircle className="text-4xl" />
      </div>
   );
}

export default TopBar;
