import { useEffect, useState } from "react";
import PlaylistCard from "./PlaylistCard";

function Playlist() {
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
  
  return <div className="playlist-container grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
    <PlaylistCard />
    <PlaylistCard />
    <PlaylistCard />
    <PlaylistCard />
    <PlaylistCard />
    <PlaylistCard />
    <PlaylistCard />
    <PlaylistCard />
    <PlaylistCard />
  </div>;
}

export default Playlist