import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router";

import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";

createRoot(document.getElementById("root")).render(
   <Provider store={store}>
      <BrowserRouter>
         <Routes>
            <Route
               path="/*"
               element={
                  <>
                     <ToastContainer position="bottom-right" theme="colored" limit={3} />
                     {/* Global Styling */}
                     <div className="app-container font-poppins bg-slate-400 dark:bg-primaryDark dark: text-textDark ">
                        <App />
                     </div>
                  </>
               }
            />
         </Routes>
      </BrowserRouter>
   </Provider>
);
