import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiThumbUp } from "react-icons/hi";

function TopVotedPlaylistCard({ rank, playlistData }) {
   const { playlistId, playlistURL, categoryName } = playlistData;
   const [playlistCardData, setPlaylistCardData] = useState([]);

   useEffect(() => {
      (async () => {
         const API_KEY = "AIzaSyCZBUxV9M35c_dijr_O70-EpYey-VFhRKw";
         try {
            const response = await fetch(
               `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${playlistURL}&key=${API_KEY}`
            );
            const data = await response.json();
            setPlaylistCardData(data.items[0]);
         } catch (error) {
            console.error(error.message);
         }
      })();
   }, []);

   return (
      <div className="relative flex gap-4 w-[600px] p-4 border shadow-md bg-neutral-100 rounded-xl border-neutral-300">
         <div className="rank absolute py-3 px-6 bg-[#1976d2] rounded-full text-2xl text-white -left-8 -top-2">
            {rank}
         </div>
         <Link to={`/dashboard/playlist/${playlistURL}/${playlistId}`}>
            <img
               className="mb-2 max-w-80 border rounded-xl border-neutral-300"
               src={playlistCardData?.snippet?.thumbnails?.standard?.url}
               alt="thumbnail"
            />
         </Link>
         <div>
            <div className="text-xl font-semibold title text-neutral-700">{playlistCardData?.snippet?.title}</div>
            <div className="text-sm instructor-name text-neutral-500">
               {playlistCardData?.snippet?.channelTitle}
            </div>
            <div className="lower-section">
               <div className="my-2 playlist-info text-neutral-600">
                  <div className="category-name ">{categoryName}</div>
                  <div className="no-of-lectures">{playlistCardData?.contentDetails?.itemCount} Lectures</div>
               </div>
               <div className="flex items-center gap-2 rating-add-button-container">
                  <div className="flex items-center gap-1 py-1 px-4 text-xl border cursor-pointer rating bg-neutral-200 border-neutral-300 text-neutral-700 rounded-2xl">
                     <HiThumbUp className="text-2xl" />
                     {playlistData?.upvotedRollNos.length}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default TopVotedPlaylistCard;
