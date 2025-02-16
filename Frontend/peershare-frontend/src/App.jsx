import "./App.css";
import { Route, Routes } from "react-router";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import PopularPlaylists from "./pages/PopularPlaylists";
import PersistentLogin from "./components/PersistentLogin";
import Peers from "./pages/Peers";

export default function App() {
   return (
      <>
         <Routes>
            <Route path="*" element={<Index />} />
            <Route element={<PersistentLogin />}>
               <Route path="dashboard" element={<Dashboard />}>
                  <Route path="popular-playlists" element={<PopularPlaylists />} />
                  <Route path="peers" element={<Peers />} />
               </Route>
            </Route>
         </Routes>
      </>
   );
}
