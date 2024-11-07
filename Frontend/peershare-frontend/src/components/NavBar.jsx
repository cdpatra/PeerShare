import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { MdDarkMode } from "react-icons/md";

export default function NavBar() {
   return (
      <nav className="fixed backdrop-blur-md w-full z-50 dark:text-white dark:bg-transparent flex items-center px-4 border-2 border-slate-500 justify-between">
         <div className="logo flex-col justify-items-center m-2">
            <img src={logo} alt="logo" className="h-12" />
            <div className="name flex flex-nowrap">
               <span className="font-playWrite">PeerShare</span>
               <span className=" inline-block text-logoGreen text-4xl -mt-4">.</span>
            </div>
         </div>
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
            <MdDarkMode className="text-3xl mr-4" />
            <Link to={"/sign-in"}
               className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
               Sign In
            </Link>
            <Link to={"/sign-up"}
               className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
               Sign Up
            </Link>
         </div>
      </nav>
   );
}
