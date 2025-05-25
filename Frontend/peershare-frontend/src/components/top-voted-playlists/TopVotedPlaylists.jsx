import { useEffect, useRef, useState } from "react";
import TopVotedPlaylistCard from "./TopVotedPlaylistCard";
import axios from "axios";
import { IoFilterOutline } from "react-icons/io5";

function TopVotedPlaylists() {
   const [playlists, setPlaylists] = useState([]);
   const [isFilterSelected, setIsFilterSelected] = useState(false);
   const [categories, setCategories] = useState();
   const [currentFilter, setCurrentFilter] = useState("");

   const filterRef = useRef(); // Ref for detecting outside click

   const fetchPlaylists = async () => {
      try {
         const token = localStorage.getItem("token");

         // Fetching all playlist data
         const response = await fetch("http://localhost:8080/users/playlist", {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         });

         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }

         const playlistData = await response.json();
         // Sort playlists by upvote count (descending order)
         const sortedPlaylists = [...playlistData].sort((a, b) => {
            return b.upvotedRollNos.length - a.upvotedRollNos.length;
         });
         setPlaylists(sortedPlaylists);

         // Fetching all category data
         const { data } = await axios.get("http://localhost:8080/users/category", {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         setCategories(data);
      } catch (error) {
         console.error(error.message);
      }
   };

   useEffect(() => {
      fetchPlaylists();
   }, []);
   return (
      <div className="flex flex-col gap-6 items-center">
         <div className="flex self-end justify-end">
            <div className="relative inline-block text-left" ref={filterRef}>
               <button
                  onClick={() => setIsFilterSelected(!isFilterSelected)}
                  className={`inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-gradient-to-r from-white to-gray-100 px-6 py-2 text-sm font-semibold text-gray-700 shadow-md hover:shadow-lg transition-all duration-300 ${
                     isFilterSelected || currentFilter !== "" ? "ring-2 ring-blue-400 shadow-blue-300" : ""
                  }`}>
                  <IoFilterOutline
                     className={`text-lg transition-transform duration-300 ${
                        isFilterSelected ? "rotate-180 text-blue-500" : "text-gray-500"
                     }`}
                  />
                  Filter
               </button>

               <ul
                  className={`absolute mt-2 left-0 right-0 origin-top-right rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-20 transition-all duration-300 ${
                     isFilterSelected ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
                  }`}>
                  <li
                     onClick={() => {
                        setCurrentFilter("");
                        setIsFilterSelected(false);
                     }}
                     className="px-4 py-2 text-gray-700 transition-colors duration-200 cursor-pointer hover:bg-blue-100 hover:text-blue-800">
                     All
                  </li>
                  {categories?.map((category) => (
                     <li
                        key={category.categoryId}
                        onClick={() => {
                           setCurrentFilter(category.categoryId);
                           setIsFilterSelected(false);
                        }}
                        className={`px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800 cursor-pointer transition-colors duration-200 ${
                           currentFilter === category.categoryId
                              ? "bg-blue-200 text-blue-800"
                              : "bg-inherit text-gray-700"
                        }`}>
                        {category.categoryName}
                     </li>
                  ))}
               </ul>
            </div>
         </div>
         {(() => {
            const filteredPlaylist = playlists
               ?.filter((playlist) => (currentFilter === "" ? true : playlist.categoryId === currentFilter))
               ?.map((data, index) => (
                  <TopVotedPlaylistCard
                     key={data.playlistId}
                     fetchPlaylists={fetchPlaylists}
                     playlistData={data}
                     rank={index + 1}
                  />
               ));
            if (filteredPlaylist.length) {
               return <>{filteredPlaylist}</>;
            } else {
               return <div className="mt-48 text-2xl text-center text-gray-400">No playlist available</div>;
            }
         })()}
         {/* {playlists.map((playlistData, index) => (
            <TopVotedPlaylistCard key={index} rank={index + 1} playlistData={playlistData} />
         ))} */}
      </div>
   );
}

export default TopVotedPlaylists;
