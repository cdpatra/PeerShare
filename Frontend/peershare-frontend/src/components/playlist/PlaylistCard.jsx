import { useEffect, useState } from "react";

function PlaylistCard() {
   const [playlistData, setPlaylistData] = useState([]);
   useEffect(() => {
      (async () => {
         try {
          const token = localStorage.getItem("token"); 
            const response = await fetch("http://localhost:8080/users/playlist", {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`, // Set Authorization header
               },
            });

            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setPlaylistData(data);
         } catch (error) {
            console.error(error.message);
         }
      })();
   }, []);
   return (
      <div className="bg-neutral-100 rounded-xl overflow-hidden p-2 shadow-md border border-neutral-300">
         <img
            className="rounded-xl mb-2 border border-neutral-300"
            src="https://thumbs.dreamstime.com/b/basic-rgb-261361273.jpg"
            alt="thumbnail"
         />
         <div className="title font-semibold text-xl text-neutral-700">Playlist Name </div>
         <div className="instructor-name text-sm text-neutral-500">Instructor Name</div>
         <div className="lower-section flex justify-between items-center">
            <div className="playlist-info my-2 text-neutral-600">
               <div className="category-name ">Java</div>
               <div className="no-of-lectures">24 Lectures</div>
            </div>
            <div className="rating-add-button-container flex gap-4 items-center">
               <div className="rating flex gap-1 items-center bg-neutral-200 border border-neutral-300 text-neutral-700 px-3 py-1 rounded-2xl">
                  <img src="/images/star.png" alt="rating stars" className="w-5" />
                  4.4
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
