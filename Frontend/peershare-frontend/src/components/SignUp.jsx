import { useState } from "react";
import { Link } from "react-router-dom";
import TagsInputBox from "./utility/TagsInputBox";
import { signUp } from "../service/student-service";
import { toast } from "react-toastify";
export default function SignUp() {
   const [student, setStudent] = useState({
      rollNo: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      graduationYear: "",
      collegeName: "",
      profilePhoto: "",
      skills: [],
      description: "",
   });
   const inputHandler = (key, value) => {
      setStudent({ ...student, [key]: value });
   };

   const submitHandler = (event) => {
      event.preventDefault();

      signUp(student)
         .then((data) => {
            console.log(data);
            toast.success("Registered Successfully !");
         })
         .catch((error) => {
            toast.error(error.message);
         });
   };

   return (
      <section className="bg-gray-50 dark:bg-gray-900 px-2">
         <div className="flex flex-col items-center py-8 mx-auto">
            <div className="w-full bg-white rounded-lg shadow dark:border mt-24 sm:max-w-2xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
               <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                     Create an account
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={(event) => submitHandler(event)}>
                     <div className="information flex flex-col sm:flex-row gap-2">
                        <div className="w-full">
                           <label
                              htmlFor="college-name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Your College Name
                           </label>
                           <input
                              type="text"
                              name="collegeName"
                              id="college-name"
                              onChange={(event) => inputHandler("collegeName", event.target.value)}
                              value={student.collegeName}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-full dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="College Name"
                              required={true}
                           />
                        </div>
                        <div className="w-full">
                           <label
                              htmlFor="college-roll"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Your College Roll no&apos;
                           </label>
                           <input
                              type="text"
                              name="rollNo"
                              id="college-roll"
                              onChange={(event) => inputHandler("rollNo", event.target.value)}
                              value={student.rollNo}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-full dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="College Roll no'"
                              required={true}
                           />
                        </div>
                     </div>
                     <div className="name flex flex-col sm:flex-row gap-2">
                        <div className="w-full">
                           <label
                              htmlFor="first-name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Your First Name
                           </label>
                           <input
                              type="text"
                              name="firstName"
                              id="first-name"
                              onChange={(event) => inputHandler("firstName", event.target.value)}
                              value={student.firstName}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-full dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="First Name"
                              required={true}
                           />
                        </div>
                        <div className="w-full">
                           <label
                              htmlFor="last-name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Your Last Name
                           </label>
                           <input
                              type="text"
                              name="lastName"
                              id="last-name"
                              onChange={(event) => inputHandler("lastName", event.target.value)}
                              value={student.lastName}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-full dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Last Name"
                              required={true}
                           />
                        </div>
                     </div>

                     <div>
                        <label
                           htmlFor="email"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                           Your email
                        </label>
                        <input
                           type="email"
                           name="email"
                           id="email"
                           onChange={(event) => inputHandler("email", event.target.value)}
                           value={student.email}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="name@company.com"
                           required={true}
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="password"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                           Password
                        </label>
                        <input
                           type="password"
                           name="password"
                           id="password"
                           placeholder="••••••••"
                           onChange={(event) => inputHandler("password", event.target.value)}
                           value={student.password}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required={true}
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="confirm-password"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                           Confirm password
                        </label>
                        <input
                           type="password"
                           name="confirm-password"
                           id="confirm-password"
                           placeholder="••••••••"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required={true}
                        />
                     </div>
                     <div className="extra-information flex flex-col sm:flex-row gap-2">
                        <div className="w-full">
                           <label
                              htmlFor="graduation-year"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Year of Graduation
                           </label>
                           <input
                              type="number"
                              name="graduationYear"
                              id="graduation-year"
                              onChange={(event) => inputHandler("graduationYear", event.target.value)}
                              value={student.graduationYear}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-full dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Year of Graduation"
                              required={true}
                           />
                        </div>
                        <div className="w-full">
                           <label
                              htmlFor="profile-photo"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Upload Your Profile Photo
                           </label>
                           <input
                              id="profile-photo"
                              name="profilePhoto"
                              className=" p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-600"
                              type="file"
                           />
                        </div>
                     </div>
                     <TagsInputBox student={student} setStudent={setStudent} />
                     <div>
                        <label
                           htmlFor="description"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                           Write something about yourself
                        </label>
                        <textarea
                           id="description"
                           rows={4}
                           onChange={(event) => inputHandler("description", event.target.value)}
                           value={student.description}
                           className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Write here..."
                        />
                     </div>

                     <div className="flex items-start">
                        <div className="flex items-center h-5">
                           <input
                              id="terms"
                              aria-describedby="terms"
                              type="checkbox"
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                              required={true}
                           />
                        </div>
                        <div className="ml-3 text-sm">
                           <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                              I accept the{" "}
                              <a
                                 className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                 href="#">
                                 Terms and Conditions
                              </a>
                           </label>
                        </div>
                     </div>
                     <button
                        type="submit"
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Create an account
                     </button>
                     <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link
                           to={"/sign-in"}
                           className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                           Sign In here
                        </Link>
                     </p>
                  </form>
               </div>
            </div>
         </div>
      </section>
   );
}
