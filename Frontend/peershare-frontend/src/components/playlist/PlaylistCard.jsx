import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PlaylistCard({ playlistData }) {
   const { playlistId ,playlistURL, categoryName, review } = playlistData;
   const [playlistCardData, setPlaylistCardData] = useState([]);
   const [added, setAdded] = useState(false);
   

const addPlaylistHandler = async () => {
  
  const studentId = localStorage.getItem("rollNo");
  const token =localStorage.getItem("token");

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

   useEffect(() => {
      (async () => {
         const API_KEY = "AIzaSyCZBUxV9M35c_dijr_O70-EpYey-VFhRKw";
         try {
            const response = await fetch(
               `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${playlistURL}&key=${API_KEY}`
            );
            const data = await response.json();
            console.log(data);
            setPlaylistCardData(data.items[0]);
         } catch (error) {
            console.error(error.message);
         }
      })();
   }, []);
   return (
      <div className="flex flex-col justify-between p-2 overflow-hidden border shadow-md bg-neutral-100 rounded-xl border-neutral-300">
         <Link to={`/dashboard/playlist/${playlistURL}/${playlistId}`}>
            <img
               className="mb-2 border rounded-xl border-neutral-300"
               src={playlistCardData?.snippet?.thumbnails?.standard?.url}
               alt="thumbnail"
            />
         </Link>
         <div className="text-xl font-semibold title text-neutral-700">{playlistCardData?.snippet?.title}</div>
         <div className="text-sm instructor-name text-neutral-500">{playlistCardData?.snippet?.channelTitle}</div>
         <div className="flex items-center justify-between lower-section">
            <div className="my-2 playlist-info text-neutral-600">
               <div className="category-name ">{categoryName}</div>
               <div className="no-of-lectures">{playlistCardData?.contentDetails?.itemCount} Lectures</div>
            </div>
            <div className="flex items-center gap-2 rating-add-button-container">
               <div className="flex items-center gap-1 px-3 py-1 border rating bg-neutral-200 border-neutral-300 text-neutral-700 rounded-2xl">
                  <img src="/images/star.png" alt="rating stars" className="w-5" />
                  {review}
               </div>
               <button onClick={addPlaylistHandler} className="px-4 py-2 border rounded-md add-button bg-cyan-400 border-cyan-500 hover:bg-cyan-500">
                  {playlistData.added ||added ?"Added":"Add"}
               </button>
               
            </div>
         </div>
      </div>
   );
}

export default PlaylistCard;
