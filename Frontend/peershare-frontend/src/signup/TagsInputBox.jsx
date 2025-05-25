// /* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
// import { RxCrossCircled } from "react-icons/rx";

// export default function TagsInputBox({ student, setStudent }) {
//    const [skills, setSkills] = useState(student.skills);
//    const [skill, setSkill] = useState("");

//    const style = {
//       borderWidth: 1,
//       paddingTop: 2,
//       paddingBottom: 2,
//       paddingLeft: 12,
//       paddingRight: 12,
//       borderRadius: 5,
//       borderColor: "gray",
//       backgroundColor: "#0000002a",
//       display: "flex",
//       alignItems: "center",
//       gap: 8,
//    };

//    const addNewSkill = (skill) => {
//       const newSkill = skill.trim();
//       let isNewSkillPresent = false;
//       skills.forEach((skill) => {
//          if (skill.toLowerCase() === newSkill.toLowerCase()) {
//             isNewSkillPresent = true;
//          }
//       });
//       if (!isNewSkillPresent) setSkills([...skills, newSkill]);
//       setSkill("");
//    };

//    const enterHandler = (event) => {
//       event.preventDefault();
//       const skill = event.target.value;
//       if (skill !== "") addNewSkill(skill);
//    };

//    const addButtonHandler = (event) => {
//       const skill = event.currentTarget.previousSibling.value;
//       if (skill !== "") addNewSkill(skill);
//    };

//    const crossHandler = (event) => {
//       const s = event.currentTarget.parentElement.innerText;
//       setSkills(skills.filter((skill) => s !== skill));
//    };

//    useEffect(() => {
//       setStudent({ ...student, skills });
//    }, [student.skills]);

//    return (
//       <div>
//          <label htmlFor="skills" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//             Add your skills
//          </label>
//          <div className="wrapper focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-blue-500 dark:focus:border-blue-500">
//             <div
//                id="tag-container"
//                className="min-h-14 flex gap-2 flex-wrap items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-t-lg  p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 w-full dark:text-white">
//                {skills.map((s, index) => (
//                   <div key={index} style={style}>
//                      {s}
//                      <div
//                         onClick={(event) => {
//                            crossHandler(event);
//                         }}>
//                         <RxCrossCircled />
//                      </div>
//                   </div>
//                ))}
//             </div>
//             <div className="flex">
//                <input
//                   name="skills"
//                   value={skill}
//                   onChange={(event) => setSkill(event.target.value)}
//                   onKeyDown={(event) => (event.key == "Enter" ? enterHandler(event) : "")}
//                   className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-bl-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white basis-4/5"
//                   id="skills"
//                   type="text"
//                   placeholder="Add a single skill at a time."
//                />
//                <button
//                   type="button"
//                   onClick={(event) => addButtonHandler(event)}
//                   className="text-sm font-medium text-white bg-blue-700 rounded-br-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 basis-1/5">
//                   Add
//                </button>
//             </div>
//          </div>
//       </div>
//    );
// }

import { useEffect, useState } from "react";


import { RxCrossCircled } from "react-icons/rx";

export default function TagsInputBox({ student, setStudent }) {
   const style = {
      borderWidth: 1,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 12,
      paddingRight: 12,
      borderRadius: 5,
      borderColor: "gray",
      backgroundColor: "#0000002a",
      display: "flex",
      alignItems: "center",
      gap: 8,
   };

   const addNewSkill = (newSkill) => {
      const trimmedSkill = newSkill.trim();
      if (!trimmedSkill) return;
      
      const isSkillPresent = student.skills.some(
         skill => skill.toLowerCase() === trimmedSkill.toLowerCase()
      );
      
      if (!isSkillPresent) {
         setStudent({
            ...student,
            skills: [...student.skills, trimmedSkill]
         });
      }
   };

   const enterHandler = (event) => {
      event.preventDefault();
      const skill = event.target.value;
      if (skill !== "") {
         addNewSkill(skill);
         event.target.value = ""; // Clear input after adding
      }
   };

   const addButtonHandler = (event) => {
      const inputElement = event.currentTarget.previousSibling;
      const skill = inputElement.value;
      if (skill !== "") {
         addNewSkill(skill);
         inputElement.value = ""; // Clear input after adding
      }
   };

   const removeSkill = (skillToRemove) => {
      setStudent({
         ...student,
         skills: student.skills.filter(skill => skill !== skillToRemove)
      });
   };

   return (
      <div>
         <label htmlFor="skills" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Add your skills
         </label>
         <div className="wrapper focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <div
               id="tag-container"
               className="min-h-14 flex gap-2 flex-wrap items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-t-lg p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 w-full dark:text-white">
               {student.skills.map((s, index) => (
                  <div key={index} style={style}>
                     {s}
                     <div onClick={() => removeSkill(s)}>
                        <RxCrossCircled />
                     </div>
                  </div>
               ))}
            </div>
            <div className="flex">
               <input
                  name="skills"
                  onKeyDown={(event) => (event.key === "Enter" ? enterHandler(event) : "")}
                  className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-bl-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white basis-4/5"
                  id="skills"
                  type="text"
                  placeholder="Add a single skill at a time."
               />
               <button
                  type="button"
                  onClick={addButtonHandler}
                  className="text-sm font-medium text-white bg-blue-700 rounded-br-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 basis-1/5">
                  Add
               </button>
            </div>
         </div>
      </div>
   );
}