import { useEffect, useState } from "react";
import axios from "axios";
import MyPlaylistCard from "./MyPlaylistCard";
import { Box } from "@mui/material";

export const MyPlaylist = () => {
   const [myPlaylistData, setMyPlaylistData] = useState(null);

   const fetchStudentData = async () => {
      const token = localStorage.getItem("token");
      const studentId = localStorage.getItem("rollNo"); // assuming rollNo is the student ID

      try {
         const response = await axios.get(`http://localhost:8080/users/student/${studentId}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         setMyPlaylistData(response.data.myPlaylistsDtos);
         console.log("Student Data:", response.data);
      } catch (error) {
         if (error.response) {
            console.error("Error from server:", error.response.data.message);
         } else {
            console.error("Network or other error:", error.message);
         }
      }
   };

   useEffect(() => {
      fetchStudentData();
   }, []);

   return (
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
         <Box sx={{ p: 2, margin: "auto", maxWidth: "1300px" }}>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
               {myPlaylistData?.map((playlistData) => {
                  return (
                     <MyPlaylistCard
                        fetchStudentData={fetchStudentData}
                        playlistData={playlistData}
                        key={playlistData.playlistId}
                     />
                  );
               })}
            </div>
         </Box>
      </Box>
   );
};
