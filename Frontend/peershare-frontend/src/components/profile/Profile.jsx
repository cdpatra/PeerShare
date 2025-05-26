import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {
   const [profileDetails, setProfileDetails] = useState(null);
   const [loading, setLoading] = useState(true);
   const rollNo = useParams()["roll-no"];
   const token = localStorage.getItem("token");

   useEffect(() => {
      (async () => {
         try {
            const { data } = await axios.get(`http://localhost:8080/users/student/${rollNo}`, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });
            setProfileDetails(data);
         } catch (error) {
            console.log(error.message);
         } finally {
            setLoading(false);
         }
      })();
   }, [rollNo, token]);

   if (loading) {
      return (
         <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
         </div>
      );
   }

   if (!profileDetails) {
      return (
         <div className="flex justify-center items-center h-screen">
            <p className="text-red-500 text-lg">Failed to load profile details</p>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
         <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
               <div className="flex flex-col md:flex-row items-center">
                  <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden mb-4 md:mb-0 md:mr-6">
                     <img
                        src={profileDetails.profilePhoto || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                     />
                  </div>
                  <div>
                     <h1 className="text-3xl font-bold">
                        {profileDetails.firstName} {profileDetails.lastName}
                     </h1>
                     <p className="text-blue-100">{profileDetails.email}</p>
                     <p className="mt-2">
                        <span className="font-semibold">Roll No:</span> {profileDetails.rollNo}
                     </p>
                     <p>
                        <span className="font-semibold">College:</span> {profileDetails.collegeName}
                     </p>
                     <p>
                        <span className="font-semibold">Graduation Year:</span> {profileDetails.graduationYear}
                     </p>
                  </div>
               </div>
            </div>

            {/* Profile Details */}
            <div className="p-6">
               {/* About Section */}
               <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">About</h2>
                  <p className="text-gray-700">{profileDetails.description}</p>
               </div>

               {/* Skills Section */}
               <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                     {profileDetails.skills.map((skill, index) => (
                        <span
                           key={index}
                           className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                           {skill}
                        </span>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Profile;
