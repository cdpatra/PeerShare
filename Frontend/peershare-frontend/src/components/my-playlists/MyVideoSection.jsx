import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";

const API_KEY = "AIzaSyCZBUxV9M35c_dijr_O70-EpYey-VFhRKw";

const MyVideoSection = () => {
   const location = useLocation();
   const params = useParams();
   const playlistURL = new URLSearchParams(location.search).get("playlist-url");
   const playlistId = new URLSearchParams(location.search).get("playlist-id");
   const videoId = new URLSearchParams(location.search).get("video-id");
   const lectureNo = new URLSearchParams(location.search).get("lecture-no");
   // const [videoId, setVideoId] = useState(null);
   const [videoDetails, setVideoDetails] = useState(null);
   const [playlistVideos, setPlaylistVideos] = useState([]);
   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
   const [notes, setNotes] = useState("");
   const [savedNotes, setSavedNotes] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchPlaylistVideos = async () => {
         try {
            const response = await fetch(
               `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistURL}&key=${API_KEY}`
            );
            const data = await response.json();
            if (data.error) throw new Error(data.error.message);

            setPlaylistVideos(data.items);
            const initialVideoIndex = params.videoIndex ? parseInt(params.videoIndex) : 0;
            setCurrentVideoIndex(initialVideoIndex);
            // setVideoId(data.items[initialVideoIndex]?.snippet.resourceId.videoId);
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      };

      if (playlistURL) {
         fetchPlaylistVideos();
      }
   }, [playlistURL, params.videoIndex]);

   useEffect(() => {
      const fetchVideoDetails = async () => {
         if (!videoId) return;

         try {
            const response = await fetch(
               `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`
            );
            const data = await response.json();
            if (data.error) throw new Error(data.error.message);

            setVideoDetails(data.items[0]);
            fetchNotes();
         } catch (err) {
            setError(err.message);
         }
      };

      fetchVideoDetails();
   }, [videoId]);

   const fetchNotes = async () => {
      try {
         const queryParams = new URLSearchParams({
            studentId: localStorage.getItem("rollNo"),
            playlistId: playlistId,
            lectureNo: lectureNo,
         });
         const response = await fetch(`http://localhost:8080/users/note?${queryParams}`, {
            method: "GET",
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         });

         const data = await response.json();
         console.log(data);
         if (response.ok) {
            setSavedNotes(data.notes || []);
            setNotes(data.noteContent);
         } else {
            throw new Error(data.message || "Failed to fetch notes");
         }
      } catch (err) {
         console.error("Error fetching notes:", err);
      }
   };

   const saveNotes = async () => {
      const queryParams = new URLSearchParams({
         studentId: localStorage.getItem("rollNo"),
         playlistId: playlistId,
         lectureNo: lectureNo,
      });
      try {
         const response = await fetch(`http://localhost:8080/users/note?${queryParams}`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
               lectureNo: currentVideoIndex + 1,
               lectureURL: "abc",
               noteContent: notes,
            }),
         });

         const data = await response.json();
         console.log(data);
         if (response.ok) {
            alert("Notes saved successfully!");
            fetchNotes();
         } else {
            throw new Error(data.message || "Failed to save notes");
         }
      } catch (err) {
         console.error("Error saving notes:", err);
         alert("Failed to save notes: " + err.message);
      }
   };

   const handleVideoChange = (index) => {
      setCurrentVideoIndex(index);
      // setVideoId(playlistVideos[index].snippet.resourceId.videoId);
      setNotes("");
   };

   if (loading) return <div className="text-center py-10">Loading...</div>;
   if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
   if (!videoId) return <div className="text-center py-10">No video selected</div>;

   return (
      <div className="w-full h-screen md:px-16 flex flex-col bg-white text-black">
         {/* Video Section (60%) */}
         <div className="flex-[1] md:flex-[5] px-4">
            <div className="relative mt-8 h-full rounded-lg overflow-hidden">
               <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${videoId}`}
                  width="100%"
                  height="100%"
                  controls={true}
                  playing={true}
                  // className="absolute top-0 left-0"
                  config={{
                     youtube: {
                        playerVars: { modestbranding: 1, rel: 0 },
                     },
                  }}
               />
            </div>
         </div>

         {/* Notes Section (40%) */}
         <div className="flex-[2] mt-12 w-full p-4 overflow-y-auto bg-gray-50 rounded-t-2xl shadow-inner">
            <h2 className="text-lg font-bold mb-2">Lecture Notes</h2>

            <textarea
               className="w-full h-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
               placeholder="Write your notes here..."
               value={notes}
               onChange={(e) => setNotes(e.target.value)}
            />

            <div className="flex justify-end mt-2">
               <button
                  onClick={saveNotes}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Save Notes
               </button>
            </div>

            {savedNotes.length > 0 && (
               <div className="mt-4 max-h-40 overflow-y-auto">
                  <h3 className="font-semibold mb-2">Saved Notes History</h3>
                  <div className="space-y-2">
                     {savedNotes.map((note, index) => (
                        <div key={index} className="bg-white p-3 rounded border border-gray-200">
                           <p className="text-sm text-gray-500">{new Date(note.timestamp).toLocaleString()}</p>
                           <p className="mt-1 text-sm">{note.content}</p>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default MyVideoSection;
