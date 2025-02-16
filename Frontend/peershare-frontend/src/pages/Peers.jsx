import PeerCard from "../components/PeerCard";
import { useGetPeersQuery } from "../features/peers/peersApiSlice";

function Peers() {
   const { data: studentInfo, isLoading } = useGetPeersQuery();
   return isLoading ? (
      <div>Loading...</div>
   ) : (
      <div className="playlists-container grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-x-14 gap-y-10 pt-6">
         <PeerCard studentInfo={studentInfo?.[0]} />
         <PeerCard studentInfo={studentInfo?.[1]} />
         <PeerCard studentInfo={studentInfo?.[2]} />
         <PeerCard studentInfo={studentInfo?.[3]} />
      </div>
   );
}

export default Peers;
