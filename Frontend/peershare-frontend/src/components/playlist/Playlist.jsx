import { useEffect, useRef, useState } from "react";
import PlaylistCard from "./PlaylistCard";
import { Box } from "@mui/material";
import { IoFilterOutline } from "react-icons/io5";
import axios from "axios";

function Playlist() {
   const [playlistData, setPlaylistData] = useState([]);
   const [isFilterSelected, setIsFilterSelected] = useState(false);
   const [categories, setCategories] = useState();
   const [currentFilter, setCurrentFilter] = useState("");

   const filterRef = useRef(); // Ref for detecting outside click

   const fetchPlaylists = async () => {
      try {
         const token = localStorage.getItem("token");
         const studentId = localStorage.getItem("rollNo");

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

         //fetching studentdto playlist
         const studentResponse = await fetch(`http://localhost:8080/users/student/${studentId}`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         });

         if (!studentResponse.ok) {
            throw new Error(`Student API error! Status: ${studentResponse.status}`);
         }

         const { myPlaylistsDtos: studentPlaylists } = await studentResponse.json();
         console.log(studentPlaylists);

         let playlistsToDisplay = [];
         for (let playlistObj of playlistData) {
            const isAdded = studentPlaylists.some(
               (studentPlaylistObj) => studentPlaylistObj.playlistId === playlistObj.playlistId
            );
            if (isAdded) {
               playlistObj.added = true;
            }
            playlistsToDisplay = [...playlistsToDisplay, playlistObj];
         }

         setPlaylistData(playlistsToDisplay);

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

   // Close dropdown on outside click
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (filterRef.current && !filterRef.current.contains(event.target)) {
            setIsFilterSelected(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   return (
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
         <Box sx={{ p: 2, margin: "auto", maxWidth: "1300px" }}>
            <div className="flex justify-end">
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
               const filteredPlaylist = playlistData
                  ?.filter((playlist) => (currentFilter === "" ? true : playlist.categoryId === currentFilter))
                  ?.map((data) => (
                     <PlaylistCard key={data.playlistId} fetchPlaylists={fetchPlaylists} playlistData={data} />
                  ));

               if (filteredPlaylist.length) {
                  return (
                     <div className="playlist-container mt-4 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
                        {filteredPlaylist}
                     </div>
                  );
               } else {
                  return <div className="mt-48 text-2xl text-center text-gray-400">No playlist available</div>;
               }
            })()}
         </Box>
      </Box>
   );
}

export default Playlist;
