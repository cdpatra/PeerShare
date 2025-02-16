import { useEffect, useState } from "react";
import { YOUTUBE_DATA_API_KEY } from "../service/app-constants";
import { Link } from "react-router";

/* eslint-disable react/prop-types */

function PlaylistCard({ playlistInfo }) {
   const [youtubePlaylistData, setYoutubePlaylistData] = useState({});
   const [isLoading, setIsLoading] = useState(true);
   const { review, playlistURL, categoryName, categoryId } = playlistInfo;

   useEffect(() => {
      const fetchYoutubePlaylistData = async (playlistURL) => {
         try {
            let youtubePlaylistData = await fetch(
               `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${playlistURL}&key=${YOUTUBE_DATA_API_KEY}`
            );
            youtubePlaylistData = await youtubePlaylistData.json();
            if (youtubePlaylistData?.error) {
               throw youtubePlaylistData.error;
            }
            setYoutubePlaylistData(youtubePlaylistData);
         } catch (error) {
            setYoutubePlaylistData({ error: error.message });
         } finally {
            setIsLoading(false);
         }
      };
      fetchYoutubePlaylistData(playlistURL);
   }, [playlistURL]);
   return isLoading ? (
      <div className="animate-pulse backdrop-blur-[2px] border-2 border-slate-500 rounded-md overflow-hidden flex flex-col">
         <div className="bg-slate-600 h-64 cursor-pointer flex justify-center items-center text-slate-300 p-8 text-center"></div>
         <div className="p-4">
            <h1 className="my-4 p-4 bg-slate-600 rounded-md w-full"></h1>
            <p className="p-2 bg-slate-600 rounded-md w-4/5"></p>
            <p className="my-2 p-2 bg-slate-600 rounded-md w-1/2"></p>
            <p className="my-2 p-2 bg-slate-600 rounded-md w-1/2"></p>
            <p className="my-2 p-2 bg-slate-600 rounded-md w-1/2"></p>
         </div>
         <button
            type="button"
            className="bg-logoDarkGreen font-medium rounded-lg text-sm px-8 py-4 mb-4 mr-4 place-self-end"></button>
      </div>
   ) : (
      <div className="backdrop-blur-[2px] border-2 border-slate-500 rounded-md overflow-hidden flex flex-col justify-between">
         <div>
            {youtubePlaylistData.error ? (
               <div className="bg-slate-600 h-40 cursor-pointer flex justify-center items-center text-slate-300 p-8 text-center">
                  {youtubePlaylistData.error}
               </div>
            ) : (
               <Link>
                  <img
                     className="mx-auto"
                     src={youtubePlaylistData?.items[0]?.snippet?.thumbnails?.high?.url}
                     alt="playlist thumbnail"
                  />
               </Link>
            )}
            <div className="p-4 text-md">
               <h1 className="text-xl my-4 font-bold">
                  {youtubePlaylistData?.items?.[0]?.snippet?.title || "Title"}
               </h1>
               <p>Channel : {youtubePlaylistData?.items?.[0]?.snippet?.channelTitle}</p>
               <p>No of Lectures : {youtubePlaylistData?.pageInfo?.totalResults}</p>
               <p id={categoryId}>Category : {categoryName}</p>
               <p>Ratings : {review}</p>
            </div>
         </div>
         <button
            type="button"
            className="focus:outline-none text-white bg-logoGreen hover:bg-logoDarkGreen focus:ring-4 focus:ring-logoLightGreen font-medium rounded-lg text-sm px-5 py-2.5 mb-4 mr-4 dark:bg-logoGreen dark:hover:bg-logoDarkGreen dark:focus:ring-logoLightGreen place-self-end">
            Add
         </button>
      </div>
   );
}

export default PlaylistCard;
