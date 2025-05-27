import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AiCard({ playlistData}) {
   const { playlistId ,playlistURL, categoryName, review } = playlistData;
   const [playlistCardData, setPlaylistCardData] = useState([]);
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
    <Link to={`/dashboard/ai-summarizer/${playlistId}`} className="flex flex-col items-center w-full gap-4 p-4 transition-all duration-300 ease-in-out transform bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-95">
      <div className="flex flex-col justify-between w-full p-2 overflow-hidden border shadow-md bg-neutral-100 rounded-xl border-neutral-300">
         <div className="text-xl font-semibold title text-neutral-700">{playlistCardData?.snippet?.title}</div>
         <div className="text-sm instructor-name text-neutral-500">{playlistCardData?.snippet?.channelTitle}</div>
         <div className="flex items-center justify-between lower-section">
            <div className="my-2 playlist-info text-neutral-600">
               <div className="category-name ">{categoryName}</div>
               <div className="no-of-lectures">{playlistCardData?.contentDetails?.itemCount} Lectures</div>
            </div>
         </div>
      </div>
      </Link>
   );
}

export default AiCard;