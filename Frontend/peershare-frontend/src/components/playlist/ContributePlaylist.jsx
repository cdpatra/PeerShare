import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

export const ContributePlaylist = () => {
   const [playlistUrl, setPlaylistUrl] = useState("");
   const [instructorName, setInstructorName] = useState("");
   const [categories, setCategories] = useState([]);
   const [selectedCategoryId, setSelectedCategoryId] = useState("");

   console.log({ playlistUrl, selectedCategoryId });

   // Fetch categories
   useEffect(() => {
      const fetchCategories = async () => {
         try {
            const response = await axios.get("http://localhost:8080/users/category", {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
               },
            });
            console.log(response.data);
            setCategories(response.data);
         } catch (error) {
            console.error("Error fetching categories:", error);
         }
      };
      fetchCategories();
   }, []);

   // Extract Playlist ID
   const extractPlaylistId = (url) => {
      try {
         const urlParams = new URLSearchParams(new URL(url).search);
         return urlParams.get("list");
      } catch {
         return null;
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const playlistId = extractPlaylistId(playlistUrl);

      if (!playlistId || !selectedCategoryId) {
         toast.error("Please fill out all fields correctly.");
         return;
      }
      try {
         const rollNo = localStorage.getItem("rollNo");
         const token = localStorage.getItem("token");
         await axios.post(
            `http://localhost:8080/users/playlist`,
            {
               studentId: rollNo,
               playlistURL: playlistId,
               categoryId: selectedCategoryId,
            },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );

         toast.success("Playlist saved successfully!");

         setPlaylistUrl("");
         setInstructorName("");
         setSelectedCategoryId("");
      } catch (error) {
         console.error("Error saving playlist:", error);
         toast.error(error.response.data.message);
      }
   };

   return (
      <div className="flex items-center justify-center h-screen px-4">
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 space-y-8 hover:shadow-blue-300/60 transition-all duration-500">
            <h2 className="text-3xl font-bold text-center text-blue-700 tracking-wide">Contribute Playlist</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
               {/* Playlist URL */}
               <div>
                  <label htmlFor="playlistUrl" className="block mb-2 text-sm font-semibold text-gray-700">
                     YouTube Playlist URL
                  </label>
                  <input
                     type="text"
                     id="playlistUrl"
                     value={playlistUrl}
                     onChange={(e) => setPlaylistUrl(e.target.value)}
                     placeholder="Enter YouTube playlist URL"
                     required
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-300"
                  />
               </div>

               {/* Category */}
               <div>
                  <label htmlFor="category" className="block mb-2 text-sm font-semibold text-gray-700">
                     Category
                  </label>
                  <select
                     id="category"
                     value={selectedCategoryId}
                     onChange={(e) => setSelectedCategoryId(e.target.value)}
                     required
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-300">
                     <option value="" disabled>
                        Select a category
                     </option>
                     {categories.map((category) => (
                        <option key={category.categoryId} value={category.categoryId}>
                           {category.categoryName}
                        </option>
                     ))}
                  </select>
               </div>

               {/* Submit Button */}
               <button
                  type="submit"
                  className="w-full py-3 px-6 text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg">
                  Submit
               </button>
            </form>
         </motion.div>
      </div>
   );
};
