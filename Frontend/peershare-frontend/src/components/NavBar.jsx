import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { MdDarkMode } from "react-icons/md";

export default function NavBar() {
   // Function to scroll to top
   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth", // Optional: adds smooth scrolling
      });
   };

   return (
      <nav className="fixed z-50 flex items-center justify-between w-full px-4 border-2 backdrop-blur-md dark:text-white dark:bg-transparent border-slate-500">
         <Link to={"/"} className="flex-col m-2 logo justify-items-center" onClick={scrollToTop}>
            <img src={logo} alt="logo" className="h-12" />
            <div className="flex name flex-nowrap">
               <span className="font-playWrite">PeerShare</span>
               <span className="inline-block -mt-4 text-4xl text-logoGreen">.</span>
            </div>
         </Link>
         <ul className="flex gap-14">
            <li>
               <Link to={"/"} onClick={scrollToTop}>
                  Home
               </Link>
            </li>
            <li>
               <a href="/#about">About</a>
            </li>
            <li>
               <a href="/#contact">Contact</a>
            </li>
         </ul>
         <div className="flex items-center buttons">
            {localStorage.getItem("token") ? (
               <Link
                  to={"/dashboard"}
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                  Go to dashboard
               </Link>
            ) : (
               <>
                  <Link
                     to={"/sign-in"}
                     className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                     Sign In
                  </Link>
                  <Link
                     to={"/sign-up"}
                     className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                     Sign Up
                  </Link>
               </>
            )}
         </div>
      </nav>
   );
}
