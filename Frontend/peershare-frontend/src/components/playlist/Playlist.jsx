import PlaylistCard from "./PlaylistCard";

function Playlist() {
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