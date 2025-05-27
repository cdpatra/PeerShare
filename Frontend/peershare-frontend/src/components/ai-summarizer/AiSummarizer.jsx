import axios from "axios";
import AiCard from "./AiCard";
import { useEffect, useState } from "react";

function AiSummarizer() {
   const [playlistCardData, setPlaylistCardData] = useState([]);

   
   const fetchStudentData = async () => {
      const token = localStorage.getItem("token");
      const studentId = localStorage.getItem("rollNo"); // assuming rollNo is the student ID
      
      try {
         const response = await axios.get(`http://localhost:8080/users/student/${studentId}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         console.log("Student Data:", response.data);
         setPlaylistCardData(response.data.myPlaylistsDtos); // assuming playlists is the key in the response
      } catch (error) {
         if (error.response) {
            console.error("Error from server:", error.response.data.message);
         } else {
            console.error("Network or other error:", error.message);
         }
      }
   };

   useEffect(()=>{fetchStudentData()},[]);
   return(
   <>
      <div className="flex flex-col items-center h-screen mb-1">
         <h1 className="mb-4 text-4xl font-bold">AI Summarizer</h1>
         <p className="mb-4 text-xl">Summarize your playlists with AI!</p>
         <div className="flex flex-col w-full gap-6 p-6">
         {
            playlistCardData.length > 0 ? (
               playlistCardData.map((playlist) => (
                  
                  <AiCard key={playlist.playlistId} playlistData={playlist} />
               ))
            ) : (
               <p>No playlists available.</p>
            )
         }
         </div>
        
      </div>
   </>
   
);
}

export default AiSummarizer;
