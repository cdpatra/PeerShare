import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import SignIn from "./components/SignIn.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Peer from "./components/Peer.jsx";
import Playlist from "./components/playlist/Playlist.jsx";
import PlaylistInfo from "./components/playlistInfo/PlaylistInfo.jsx";
import Categories from "./components/categories/Categories.jsx";
import VideoSection from "./components/videoSection/VideoSection.jsx";
import { MyPlaylist } from "./components/my-playlists/MyPlaylist.jsx";
import { ContributePlaylist } from "./components/playlist/ContributePlaylist.jsx";
import MyPlaylistInfo from "./components/my-playlists/MyPlaylistInfo.jsx";
import MyVideoSection from "./components/my-playlists/MyVideoSection.jsx";
import AiSummarizer from "./components/ai-summarizer/AiSummarizer.jsx";
import ChatbotSummarizer from "./components/ai-summarizer/ChatbotSummarizer.jsx";
import SignUp from "./signup/SignUp.jsx";
import TopVotedPlaylists from "./components/top-voted-playlists/TopVotedPlaylists.jsx";
import Profile from "./components/profile/Profile.jsx";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
   {
      path: "/",
      element: (
         <>
            <App />
            <ToastContainer position="bottom-center" theme="colored" />
         </>
      ),
      children: [
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/sign-in",
            element: <SignIn />,
         },
         {
            path: "/sign-up",
            element: <SignUp />,
         },
      ],
   },
   {
      path: "/dashboard",
      element: (
         <>
            <Dashboard />
            <ToastContainer position="bottom-center" theme="colored" />
         </>
      ),
      children: [
         { index: true, element: <Navigate to="playlist" replace /> },
         { path: "peer", element: <Peer /> },
         {
            path: "playlist",
            element: <Playlist />,
         },
         {
            path: "playlist/:playlist-url/:playlist-id", // Keep it separate to avoid nesting under /playlist
            element: <PlaylistInfo />,
         },
         {
            path: "categories", // Keep it separate to avoid nesting under /playlist
            element: <Categories />,
         },
         {
            path: "video-section",
            element: <VideoSection />,
         },
         {
            path: "my-playlists",
            element: <MyPlaylist />,
         },
         {
            path: "my-playlist/:playlist-url/:playlist-id",
            element: <MyPlaylistInfo />,
         },
         {
            path: "my-video-section",
            element: <MyVideoSection />,
         },
         {
            path: "top-voted-playlist",
            element: <TopVotedPlaylists />,
         },
         {
            path: "contribute-playlist",
            element: <ContributePlaylist />,
         },
         {
            path: "ai-summarizer",
            element: <AiSummarizer />,
         },
         {
            path: "ai-summarizer/:playlist-id",
            element: <ChatbotSummarizer />,
         },
         {
            path: "profile/:roll-no",
            element: <Profile />,
         },
      ],
   },
]);

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
