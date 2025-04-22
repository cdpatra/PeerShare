import { useEffect,useState } from "react";
import axios from "axios";
import MyPlaylistCard from "./MyPlaylistCard";

export const MyPlaylist = () => {
    const [myPlaylistData, setMyPlaylistData] = useState(null);
  
    useEffect(() => {
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
  
      fetchStudentData();
    }, []);
    return (
        myPlaylistData?.map((playlistData)=>{
            return (
                <MyPlaylistCard  playlistData={playlistData} key={playlistData.playlistId}/>
            )
        })
    )
}