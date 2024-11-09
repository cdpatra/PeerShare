import { useNavigate } from "react-router-dom";
import { doUnAuthentication } from "../auth/authentication";
import { toast } from "react-toastify";

function Dashboard() {
   const navigate = useNavigate();
   const clickHandler = () => {
      doUnAuthentication();
      toast.info("Signed Out Successfully !");
      navigate("/");
   };
   return (
      <div className="flex justify-between m-10 items-center">
         <div className="text-4xl">Dashboard</div>
         <div
            onClick={clickHandler}
            className="cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Sign Out
         </div>
      </div>
   );
}

export default Dashboard;
