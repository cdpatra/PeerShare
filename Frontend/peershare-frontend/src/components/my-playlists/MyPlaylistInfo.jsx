import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const API_KEY = "AIzaSyCZBUxV9M35c_dijr_O70-EpYey-VFhRKw"; // ⚠️ Replace with your actual API key

const MyPlaylistInfo = () => {
   const params = useParams();
   const playlistUrl = params["playlist-url"];
   const playlistId = params["playlist-id"];
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
      toast.success("Playlist link copied to clipboard!");
   };

   // Function to handle the "Generate Summary" button click
   const GEMINI_API_KEY = "AIzaSyDqP_grW4snuk6GHYhFUSLI2B2OkwfY7lw";

   async function summarizeLectures() {
      try {
         const { data: lectureArray } = await axios.get("http://localhost:8080/users/note/entire-playlist-notes", {
            params: {
               studentId: localStorage.getItem("rollNo"),
               playlistId: playlistId,
            },
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         });

         console.log(lectureArray);
         const formattedInput = lectureArray
            .map((item) => `Lecture ${item.lectureNo}:\n${item.noteContent}`)
            .join("\n\n");

         const prompt = `Summarize each lecture below and return the result in this format:\nLecture 1:\n...\nLecture 2:\n...\n\nLectures:\n\n${formattedInput}`;

         const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  contents: [{ parts: [{ text: prompt }] }],
               }),
            }
         );

         const data = await response.json();
         console.log(data?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary received.");
      } catch (error) {
         console.error("Error summarizing lectures:", error);
         toast.error("Error summarizing lectures. Please try again later.");
      }
   }

   return (
      <div className="flex flex-col min-h-screen gap-6 p-6 mt-20 text-black bg-white md:flex-row">
         {/* Left Section (Playlist Info) */}
         {playlistDetails && (
            <div className="w-full p-5 bg-gray-100 border border-gray-300 rounded-lg shadow-md md:w-1/3">
               <img
                  src={playlistDetails.snippet.thumbnails.high.url}
                  alt="Playlist Thumbnail"
                  className="w-full rounded-lg"
               />
               <h1 className="mt-3 text-2xl font-bold">{playlistDetails.snippet.title}</h1>
               <p className="text-gray-600">
                  {playlistDetails.snippet.channelTitle} • {playlistDetails.contentDetails.itemCount} videos
               </p>
               <p className="mt-1 text-sm text-gray-500">
                  Last updated: {new Date(playlistDetails.snippet.publishedAt).toDateString()}
               </p>

               {/* New Buttons */}
               <div className="flex flex-col gap-3 mt-4">
                  <a
                     href={`https://www.youtube.com/playlist?list=${playlistUrl}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="px-6 py-2 font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700">
                     ▶ Open on YouTube
                  </a>
                  <button
                     onClick={handleShare}
                     className="px-6 py-2 text-black bg-gray-200 rounded-lg shadow-md hover:bg-gray-300">
                     📤 Share Playlist
                  </button>
                  {/* <button
                     onClick={summarizeLectures}
                     className="px-6 py-2 text-black bg-gray-200 rounded-lg shadow-md hover:bg-blue-400">
                     🤖 Generate Summary
                  </button> */}
               </div>

               {/* Description with Scroll */}
               {/* <div className="mt-4 overflow-y-auto text-gray-700 max-h-32 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                  {playlistDetails.snippet.description}
               </div> */}
            </div>
         )}

         {/* Right Section (Playlist Videos) with SCROLL */}
         <div className="w-full md:w-2/3 h-[620px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {loading ? (
               <p className="text-lg text-center">Loading videos...</p>
            ) : error ? (
               <p className="text-center text-red-500">{error}</p>
            ) : videos.length === 0 ? (
               <p className="text-center text-gray-600">No videos found.</p>
            ) : (
               videos?.map((video, index) => (
                  <Link
                     to={`/dashboard/my-video-section/?playlist-url=${playlistUrl}&playlist-id=${playlistId}&video-id=${
                        video.snippet.resourceId.videoId
                     }&lecture-no=${index + 1}`}
                     key={video.id}
                     className="flex items-center gap-4 p-3 mb-4 transition bg-gray-100 border border-gray-300 rounded-lg shadow-md hover:bg-gray-200">
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
                  </Link>
               ))
            )}
         </div>
      </div>
   );
};

export default MyPlaylistInfo;
