import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Peer from "./components/Peer.jsx";
import Playlist from "./components/playlist/Playlist.jsx";
import PlaylistInfo from "./components/playlistInfo/PlaylistInfo.jsx";
import Categories from "./components/categories/Categories.jsx";

const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
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
   // {
   //    path: "/dashboard",
   //    element: <Dashboard />,
   //    children: [
   //       { index: true, element: <Navigate to="playlist" replace /> },
   //       { path: "peer", element: <Peer /> },
   //       {
   //          path: "playlist/*",
   //          element: <Playlist />,
   //          children: [
   //             {
   //                path: "playlist-info/:playlist-url",
   //                element: <PlaylistInfo />,
   //             },
   //          ],
   //       },
   //       // {
   //       //    path: "playlist-info/:playlist-url",
   //       //    element: <PlaylistInfo />,
   //       // },
   //    ],
   // },
   {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
         { index: true, element: <Navigate to="playlist" replace /> },
         { path: "peer", element: <Peer /> },
         {
            path: "playlist",
            element: <Playlist />,
         },
         {
            path: "playlist/:playlist-url", // Keep it separate to avoid nesting under /playlist
            element: <PlaylistInfo />,
         },
         {
            path: "categories", // Keep it separate to avoid nesting under /playlist
            element: <Categories />,
         },
      ],
   },
]);

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
