import { useGetPopularPlaylistsQuery } from "../features/popularPlaylists/popularPlaylistsApiSlice";
import PlaylistCard from "../components/PlaylistCard";
function PopularPlaylists() {
   const { data, isLoading } = useGetPopularPlaylistsQuery();
   return isLoading ? (
      <div>Loading...</div>
   ) : (
      <>
         <div className="playlists-container grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-x-14 gap-y-10">
            <PlaylistCard playlistInfo={data?.[0]} />
            <PlaylistCard playlistInfo={data?.[1]} />
            <PlaylistCard playlistInfo={data?.[2]} />
            <PlaylistCard playlistInfo={data?.[3]} />
            <PlaylistCard playlistInfo={data?.[0]} />
            <PlaylistCard playlistInfo={data?.[1]} />
            <PlaylistCard playlistInfo={data?.[2]} />
            <PlaylistCard playlistInfo={data?.[3]} />
            <PlaylistCard playlistInfo={data?.[0]} />
            <PlaylistCard playlistInfo={data?.[1]} />
            <PlaylistCard playlistInfo={data?.[2]} />
            <PlaylistCard playlistInfo={data?.[3]} />
            <PlaylistCard playlistInfo={data?.[0]} />
            <PlaylistCard playlistInfo={data?.[1]} />
            <PlaylistCard playlistInfo={data?.[2]} />
            <PlaylistCard playlistInfo={data?.[3]} />
         </div>
      </>
   );
}

export default PopularPlaylists;
