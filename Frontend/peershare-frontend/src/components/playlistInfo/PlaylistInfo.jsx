import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "AIzaSyCZBUxV9M35c_dijr_O70-EpYey-VFhRKw"; // ⚠️ Replace with your actual API key

const PlaylistInfo = () => {
   const params = useParams();
   const playlistUrl = params["playlist-url"];
   const [videos, setVideos] = useState([]);
   const [playlistDetails, setPlaylistDetails] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   // Fetch Playlist Info & Videos
   useEffect(() => {
      const fetchPlaylistData = async () => {
         try {
            // Fetch Playlist Details (Title, Thumbnail, Description)
            const playlistResponse = await fetch(
               `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${playlistUrl}&key=${API_KEY}`
            );
            const playlistData = await playlistResponse.json();
            if (playlistData.error) throw new Error(playlistData.error.message);
            setPlaylistDetails(playlistData.items[0]);

            // Fetch Videos from Playlist
            const videoResponse = await fetch(
               `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistUrl}&key=${API_KEY}`
            );
            const videoData = await videoResponse.json();
            if (videoData.error) throw new Error(videoData.error.message);
            setVideos(videoData.items || []);
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      };

      fetchPlaylistData();
   }, [playlistUrl]);

   // Function to share the playlist
   const handleShare = () => {
      const shareUrl = `https://www.youtube.com/playlist?list=${playlistUrl}`;
      navigator.clipboard.writeText(shareUrl);
      alert("Playlist link copied to clipboard!");
   };

   return (
      <div className="flex flex-col md:flex-row gap-6 p-6 bg-white text-black min-h-screen mt-20">
         {/* Left Section (Playlist Info) */}
         {playlistDetails && (
            <div className="bg-gray-100 p-5 rounded-lg w-full md:w-1/3 shadow-md border border-gray-300">
               <img
                  src={playlistDetails.snippet.thumbnails.high.url}
                  alt="Playlist Thumbnail"
                  className="rounded-lg w-full"
               />
               <h1 className="text-2xl font-bold mt-3">{playlistDetails.snippet.title}</h1>
               <p className="text-gray-600">
                  {playlistDetails.snippet.channelTitle} • {playlistDetails.contentDetails.itemCount} videos
               </p>
               <p className="text-gray-500 text-sm mt-1">
                  Last updated: {new Date(playlistDetails.snippet.publishedAt).toDateString()}
               </p>

               {/* New Buttons */}
               <div className="flex gap-3 mt-4 flex-col">
                  <a
                     href={`https://www.youtube.com/playlist?list=${playlistUrl}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-red-700">
                     ▶ Open on YouTube
                  </a>
                  <button
                     onClick={handleShare}
                     className="bg-gray-200 text-black px-6 py-2 rounded-lg shadow-md hover:bg-gray-300">
                     📤 Share Playlist
                  </button>
               </div>

               {/* Description with Scroll */}
               <div className="mt-4 max-h-32 overflow-y-auto text-gray-700 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                  {playlistDetails.snippet.description}
               </div>
            </div>
         )}

         {/* Right Section (Playlist Videos) with SCROLL */}
         <div className="w-full md:w-2/3 h-[620px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {loading ? (
               <p className="text-center text-lg">Loading videos...</p>
            ) : error ? (
               <p className="text-red-500 text-center">{error}</p>
            ) : videos.length === 0 ? (
               <p className="text-center text-gray-600">No videos found.</p>
            ) : (
               videos.map((video, index) => (
                  <div
                     key={video.id}
                     className="flex items-center gap-4 mb-4 bg-gray-100 p-3 rounded-lg shadow-md border border-gray-300 hover:bg-gray-200 transition">
                     <img
                        src={video.snippet.thumbnails.medium.url}
                        alt="Video Thumbnail"
                        className="w-32 h-20 rounded-md"
                     />
                     <div>
                        <h2 className="text-lg font-semibold">
                           {index + 1}. {video.snippet.title}
                        </h2>
                        <p className="text-gray-600">{video.snippet.channelTitle}</p>
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>
   );
};

export default PlaylistInfo;
