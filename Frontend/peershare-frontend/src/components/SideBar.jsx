import {  useState } from "react";
import { Link } from "react-router";
import { MdFeaturedPlayList } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import logo from "../assets/images/logo.svg";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";

function SideBar() {
   const [selectedLink, setSelectedLink] = useState("playlist");
   const [isExpanded, setIsExpanded] = useState(innerWidth < 640 ? false : true);
   const [expandContractStyle, setExpandContractStyle] = useState(
      innerWidth < 640 ? { width: "4rem" } : { width: "16rem" }
   );

   const unSelected = {
      width: "100%",
      padding: 8,
      marginTop: 8,
      marginBottom: 8,
      borderRadius: 5,
      backgroundColor: "#33415588",
      boxSizing: "border-box",
   };
   const selected = {
      width: "100%",
      padding: 8,
      marginTop: 8,
      marginBottom: 8,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#616e80",
      backgroundColor: "#b7d11880",
      boxSizing: "border-box",
   };
   const clickHandler = (event) => {
      if (event)
         setSelectedLink(
            event.target.id ||
               event.target.parentElement.id ||
               event.target.parentElement.parentElement.id ||
               selectedLink
         );
   };
   const expandContractNavHandler = () => {
      if (isExpanded) {
         setIsExpanded(false);
         setExpandContractStyle({ width: "4rem" });
      } else {
         setIsExpanded(true);
         setExpandContractStyle({ width: "16rem" });
      }
   };
   return (
      <div
         className="absolute z-10 sm:static flex-col backdrop-blur-md h-full dark:text-white dark:bg-transparent py-4 px-2 border-2 border-slate-500 transition-all delay-0 row-span-2 overflow-hidden"
         style={expandContractStyle}>
         <div className="logo flex justify-center items-center border-slate-500 backdrop-blur-md w-full">
            <a href="/" className=" logo flex-col block h-16">
               <img src={logo} alt="logo" className="h-12 mx-auto" />
               <div className="name flex flex-nowrap text-sm" style={isExpanded ? { opacity: 1 } : { opacity: 0 }}>
                  <span className="font-playWrite">PeerShare</span>
                  <span className=" inline-block text-logoGreen text-4xl -mt-4">.</span>
               </div>
            </a>
         </div>
         <div onClick={(event) => clickHandler(event)} className="mt-14 text-nowrap">
            <Link to={"/dashboard/popular-playlists"}>
               <div
                  className="flex items-center gap-2 overflow-hidden"
                  id="playlist"
                  style={selectedLink === "playlist" ? selected : unSelected}>
                  <MdFeaturedPlayList className="text-2xl" style={isExpanded ? undefined : { margin: "auto" }} />
                  {isExpanded ? "Popular Playlists" : ""}
               </div>
            </Link>
            <Link>
               <div
                  className="flex items-center gap-2 overflow-hidden"
                  id="category"
                  style={selectedLink === "category" ? selected : unSelected}>
                  <MdCategory className="text-2xl" style={isExpanded ? undefined : { margin: "auto" }} />
                  {isExpanded ? "Category" : ""}
               </div>
            </Link>
            <Link>
               <div
                  className="flex items-center gap-2 overflow-hidden"
                  id="notes"
                  style={selectedLink === "notes" ? selected : unSelected}>
                  <FaNoteSticky className="text-2xl" style={isExpanded ? undefined : { margin: "auto" }} />
                  {isExpanded ? "Notes" : ""}
               </div>
            </Link>
            <Link to={"/dashboard/peers"}>
               <div
                  className="flex items-center gap-2 overflow-hidden"
                  id="peers"
                  style={selectedLink === "peers" ? selected : unSelected}>
                  <FaUserFriends className="text-2xl" style={isExpanded ? undefined : { margin: "auto" }} />
                  {isExpanded ? "Peers" : ""}
               </div>
            </Link>
            <Link>
               <div
                  className="flex items-center gap-2 overflow-hidden"
                  id="my-playlists"
                  style={selectedLink === "my-playlists" ? selected : unSelected}>
                  <MdPlaylistAddCheckCircle
                     className="text-2xl"
                     style={isExpanded ? undefined : { margin: "auto" }}
                  />
                  {isExpanded ? "My Playlists" : ""}
               </div>
            </Link>
         </div>
         <div
            className="cursor-pointer text-4xl absolute bottom-2 right-[12px]"
            onClick={expandContractNavHandler}>
            {isExpanded ? <IoIosArrowDropleftCircle /> : <IoIosArrowDroprightCircle />}
         </div>
      </div>
   );
}

export default SideBar;
