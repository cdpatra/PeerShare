import { useEffect, useState } from "react";
import { fetchdata } from "./FetchData";
import { Link } from "react-router-dom";

const ProfileCard = () => {
   const [Profiledata, setProfiledata] = useState(null);

   useEffect(() => {
      const fetch = async () => {
         const res = await fetchdata();
         console.log(res);
         setProfiledata(res);
      };

      fetch();
   }, []);

   return (
      <div className="min-h-screen">
         {Profiledata ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
               {Profiledata.slice(0, 9).map((obj) => (
                  <div
                     className="overflow-hidden py-2 flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow-md"
                     key={obj.rollNo}>
                     <div className="flex flex-1 items-center justify-center overflow-hidden">
                        <img
                           src={obj.profilePhoto}
                           alt="ProfilePic_not_available"
                           className="object-cover h-44 w-44 rounded-full overflow-hidden"
                        />
                     </div>
                     <div className="p-5">
                        <h1 className="text-xl font-semibold text-gray-800">
                           {`${obj.firstName} ${obj.lastName}`}
                        </h1>
                        <p className="mt-2 text-gray-600">{`College Name: ${obj.collegeName}`}</p>
                        <p className="text-gray-600">{`Graduation Year: ${obj.graduationYear}`}</p>
                        <p className="mt-3 text-gray-600">{`Description: ${
                           obj?.description?.length
                              ? obj.description.substring(0, 80) + "..."
                              : "No Description Available"
                        }`}</p>
                        <Link
                           to={`/dashboard/profile/${obj.rollNo}`}
                           type="button"
                           className="block text-center w-full px-4 py-2 mt-5 font-medium text-white bg-blue-500 rounded-md shadow hover:bg-blue-600">
                           View Profile
                        </Link>
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            <h1 className="text-2xl font-semibold text-center text-gray-700">Loading...</h1>
         )}
      </div>
   );
};

export default ProfileCard;
