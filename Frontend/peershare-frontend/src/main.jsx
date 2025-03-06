import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
<<<<<<< HEAD
import  Dashboard from "./components/Dashboard.jsx";
import Peer from "./components/Peer.jsx";
=======
import Dashboard from "./components/Dashboard.jsx";
import Playlist from "./components/playlist/Playlist.jsx";
>>>>>>> 48d436489ef3dc52c732bf4268c34e450dff32b3

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
   {
      path: "/dashboard",
      element: <Dashboard />,
<<<<<<< HEAD
      children: [
         { path: "peer", element:<Peer/> },  
      ],
=======
>>>>>>> 48d436489ef3dc52c732bf4268c34e450dff32b3
   },
]);

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
