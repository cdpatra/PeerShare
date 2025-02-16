import { FaUserCircle } from "react-icons/fa";
function PeerCard({ studentInfo }) {
   const { rollNo, firstName, lastName, collegeName, graduationYear, skills } = studentInfo;
   return (
      <div>
         <div className="relative backdrop-blur-[2px] border-2 border-slate-500 rounded-md flex flex-col">
            <FaUserCircle className="bg-slate-600 rounded-full text-8xl absolute -top-8 left-1/2 -translate-x-1/2" />
            <div>
               <div className="bg-slate-600 h-20 mb-4"></div>
               <div className="mx-2 text-slate-300">
                  <h2 className="text-xl font-bold my-4 text-white text-center">
                     {`${firstName} ${lastName}`}
                  </h2>
                  <p>Roll No : {rollNo}</p>
                  <p>College : {collegeName}</p>
                  <p>Year Of Graduation : {graduationYear}</p>
               </div>
            </div>
            <div className="skills text-xs flex flex-wrap gap-2 mt-8 m-2">
               {skills.map((skill, index) => (
                  <div key={index} className="bg-[#85990daa] px-4 py-1 w-max rounded-full">
                     {skill}
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default PeerCard;
