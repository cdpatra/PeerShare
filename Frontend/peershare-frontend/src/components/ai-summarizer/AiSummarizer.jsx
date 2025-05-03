import axios from "axios";

function AiSummarizer() {
   const fetchStudentData = async () => {
      const token = localStorage.getItem("token");
      const studentId = localStorage.getItem("rollNo"); // assuming rollNo is the student ID

      try {
         const response = await axios.get(`http://localhost:8080/users/student/${studentId}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         console.log("Student Data:", response.data);
      } catch (error) {
         if (error.response) {
            console.error("Error from server:", error.response.data.message);
         } else {
            console.error("Network or other error:", error.message);
         }
      }
   };

   fetchStudentData();
   return <div>AiSummarizer</div>;
}

export default AiSummarizer;
