<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import { useEffect, useState } from 'react';
>>>>>>> 48d436489ef3dc52c732bf4268c34e450dff32b3
import { fetchdata } from './FetchData';

const ProfileCard = () => {
  const [Profiledata, setProfiledata] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchdata();
      setProfiledata(res);
    };

    fetch();
  }, []);

  return (
    <div className="min-h-screen px-5 py-10 bg-gray-100">
      {Profiledata ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Profiledata.slice(0, 9).map((obj) => (
            <div
              className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md"
              key={obj.rollNo}
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={obj.profilePhoto}
                  alt="ProfilePic_not_available"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-5">
                <h1 className="text-xl font-semibold text-gray-800">
                  {`${obj.firstName} ${obj.lastName}`}
                </h1>
                <p className="mt-2 text-gray-600">{`College Name: ${obj.collegeName}`}</p>
                <p className="text-gray-600">{`Graduation Year: ${obj.graduationYear}`}</p>
                <p className="mt-3 text-gray-600">{`Description: ${obj.description}`}</p>
                <button
                  type="button"
                  className="w-full px-4 py-2 mt-5 font-medium text-white bg-blue-500 rounded-md shadow hover:bg-blue-600"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Loading...
        </h1>
      )}
    </div>
  );
};

export default ProfileCard;
