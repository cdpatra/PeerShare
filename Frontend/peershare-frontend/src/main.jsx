import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute.jsx"

import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard.jsx";

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
      path: "/student",
      element: <PrivateRoute />,
      children: [
         {
            path: "dashboard",
            element: <Dashboard />,
         },
      ],
   },
]);

createRoot(document.getElementById("root")).render(
   <div className="app-wrapper">
      <ToastContainer position="bottom-right" theme="colored" limit={3} />
      <RouterProvider router={router} />
   </div>
);
