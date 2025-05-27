import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { HiThumbUp } from "react-icons/hi";

function PlaylistCard({ fetchPlaylists, playlistData }) {
   const { playlistId, playlistURL, categoryId } = playlistData;
   const [playlistCardData, setPlaylistCardData] = useState([]);
   const [added, setAdded] = useState(false);
   const [categoryName, setCategoryName] = useState();
   const [contributerName, setContributerName]=useState("");

   const addPlaylistHandler = async () => {
      const studentId = localStorage.getItem("rollNo");
      const token = localStorage.getItem("token");

      try {
         const response = await axios.put(
            `http://localhost:8080/users/student/add-playlist`,
            {},
            {
               params: {
                  playlistId,
                  studentId,
               },
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         setAdded(true);
         console.log("Playlist added:", response.data.message);
      } catch (err) {
         if (err.response) {
            console.error("Server error:", err.response.data.message);
         } else {
            console.error("Network error:", err.message);
         }
      }
   };

   const upvoteHandler = async () => {
      const studentId = localStorage.getItem("rollNo");
      const token = localStorage.getItem("token");

      try {
         const response = await axios.post(
            `http://localhost:8080/upvote`,
            {
               playlistId,
               studentId,
            },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         fetchPlaylists();
      } catch (err) {
         if (err.response) {
            console.error("Server error:", err.response.data.message);
         } else {
            console.error("Network error:", err.message);
         }
      }
   };

   useEffect(() => {
      const token = localStorage.getItem("token");
      (async () => {
         const API_KEY = "AIzaSyCZBUxV9M35c_dijr_O70-EpYey-VFhRKw";
         try {
            const response = await fetch(
               `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${playlistURL}&key=${API_KEY}`
            );
            const data = await response.json();
            setPlaylistCardData(data.items[0]);

            const categoryData = await axios.put(
               `http://localhost:8080/users/category/${categoryId}`,
               {},
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               }
            );
            setCategoryName(categoryData.data.categoryName);
            const studentData = await axios.get(
               `http://localhost:8080/users/student/${playlistData.studentId}`,
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               }
            );
            console.log(studentData.data.firstName);
            setContributerName(studentData.data.firstName);
         } catch (error) {
            console.error(error.message);
         }
      })();
   }, []);

   return (
      <div className="relative flex flex-col justify-between p-2 overflow-hidden border shadow-md bg-neutral-100 rounded-xl border-neutral-300">
         <div className="category-tag absolute shadow-2xl top-4 left-4 text-black bg-neutral-200 text-sm px-4 border border-neutral-400 rounded-full">
            {categoryName}
         </div>
         <Link to={`/dashboard/playlist/${playlistURL}/${playlistId}`}>
            <img
               className="mb-2 border rounded-xl border-neutral-300"
               src={playlistCardData?.snippet?.thumbnails?.standard?.url}
               alt="thumbnail"
            />
         </Link>
         <div className="text-xl font-semibold title text-neutral-700">{playlistCardData?.snippet?.title}</div>
         <div className="text-sm instructor-name text-neutral-500">{playlistCardData?.snippet?.channelTitle}</div>
         <div className="text-sm text-neutral-400">Contributed By: {contributerName}</div>
         <div className="flex items-center justify-between lower-section">
            <div className="my-2 playlist-info text-neutral-600">
               {/* <div className="category-name ">{categoryName}</div> */}
               <div className="no-of-lectures">{playlistCardData?.contentDetails?.itemCount} Lectures</div>
            </div>
            <div className="flex items-center gap-2 rating-add-button-container">
               <div
                  onClick={upvoteHandler}
                  className="flex items-center gap-1 p-1 border cursor-pointer rating bg-neutral-200 border-neutral-300 text-neutral-700 rounded-2xl hover:bg-neutral-300">
                  <HiThumbUp
                     className={`text-xl ${
                        playlistData?.upvotedRollNos?.includes(localStorage.getItem("rollNo"))
                           ? "text-emerald-400"
                           : "text-neutral-400"
                     }`}
                  />
                  {playlistData?.upvotedRollNos.length}
               </div>
               <button
                  onClick={addPlaylistHandler}
                  className="px-4 py-2 border rounded-md add-button bg-[#1976d2] border-blue-500 text-white hover:bg-blue-500">
                  {playlistData.added || added ? "Added" : "Add"}
               </button>
            </div>
         </div>
      </div>
   );
}

export default PlaylistCard;
