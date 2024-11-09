import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { MdDarkMode } from "react-icons/md";
import { isAuthenticated } from "../auth/authentication";
import { FaUserCircle } from "react-icons/fa";

export default function NavBar() {
   return (
      <nav className="fixed backdrop-blur-md w-full z-50 dark:text-white dark:bg-transparent flex items-center px-4 border-2 border-slate-500 justify-between">
         <a href="#" className=" logo flex-col justify-items-center m-2 block">
            <img src={logo} alt="logo" className="h-12" />
            <div className="name flex flex-nowrap">
               <span className="font-playWrite">PeerShare</span>
               <span className=" inline-block text-logoGreen text-4xl -mt-4">.</span>
            </div>
         </a>
         <ul className="flex gap-14">
            <li>
               <Link to={"/"}>Home</Link>
            </li>
            <li>
               <a href="#">About</a>
            </li>
            <li>
               <a href="#">Contact</a>
            </li>
         </ul>
         <div className="buttons flex items-center">
            <MdDarkMode className="text-3xl mr-6" />
            <div className="flex gap-2 items-center">
               {isAuthenticated() ? (
                  <>
                     <Link
                        to={"/student/dashboard"}
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        Go to Dashboard
                     </Link>
                     <FaUserCircle className="text-4xl" />
                  </>
               ) : (
                  <>
                     <Link
                        to={"/sign-in"}
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        Sign In
                     </Link>
                     <Link
                        to={"/sign-up"}
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        Sign Up
                     </Link>
                  </>
               )}
            </div>
         </div>
      </nav>
   );
}
