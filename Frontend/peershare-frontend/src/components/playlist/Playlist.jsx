import { useEffect, useState } from "react";
import PlaylistCard from "./PlaylistCard";
import { Box } from "@mui/material";

function Playlist() {
   const [playlistData, setPlaylistData] = useState([]);
   useEffect(() => {
      (async () => {
         try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/users/playlist", {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`, // Set Authorization header
               },
            });

            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setPlaylistData(data);
         } catch (error) {
            console.error(error.message);
         }
      })();
   }, []);

   return (
      <>
         <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            <Box sx={{ p: 2, margin: "auto", maxWidth: "1300px" }}>
               <div className="playlist-container mt-14 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
                  {playlistData?.map((data, i) => {
                     return <PlaylistCard key={i} playlistData={data}  />;
                  })}
               </div>
            </Box>
         </Box>
      </>
   );
}

export default Playlist;
