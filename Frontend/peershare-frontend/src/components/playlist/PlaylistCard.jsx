import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlaylistCard({ playlistData }) {
   const { playlistURL, categoryName, review } = playlistData;
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
      <div className="bg-neutral-100 flex flex-col justify-between rounded-xl overflow-hidden p-2 shadow-md border border-neutral-300">
         <Link to={`/dashboard/playlist/${playlistURL}`}>
            <img
               className="rounded-xl mb-2 border border-neutral-300"
               src={playlistCardData?.snippet?.thumbnails?.standard?.url}
               alt="thumbnail"
            />
         </Link>
         <div className="title font-semibold text-xl text-neutral-700">{playlistCardData?.snippet?.title}</div>
         <div className="instructor-name text-sm text-neutral-500">{playlistCardData?.snippet?.channelTitle}</div>
         <div className="lower-section flex justify-between items-center">
            <div className="playlist-info my-2 text-neutral-600">
               <div className="category-name ">{categoryName}</div>
               <div className="no-of-lectures">{playlistCardData?.contentDetails?.itemCount} Lectures</div>
            </div>
            <div className="rating-add-button-container flex gap-2 items-center">
               <div className="rating flex gap-1 items-center bg-neutral-200 border border-neutral-300 text-neutral-700 px-3 py-1 rounded-2xl">
                  <img src="/images/star.png" alt="rating stars" className="w-5" />
                  {review}
               </div>
               <button className="add-button px-4 py-2 bg-cyan-400 rounded-md border border-cyan-500 hover:bg-cyan-500">
                  Add
               </button>
            </div>
         </div>
      </div>
   );
}

export default PlaylistCard;
