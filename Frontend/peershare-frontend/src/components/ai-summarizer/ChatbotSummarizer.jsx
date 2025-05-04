import "./markdown.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ChatPopup from "./ChatPopup";
import { RiRobot3Line } from "react-icons/ri";
import ReactMarkdown from "react-markdown";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function ChatbotSummarizer() {
   const playlistId = useParams()["playlist-id"];
   const [notes, setNotes] = useState("");
   const [editedNotes, setEditedNotes] = useState("");
   const [showChat, setShowChat] = useState(false);
   const [isEditing, setIsEditing] = useState(false);

   useEffect(() => {
      const fetchNotes = async () => {
         try {
            const { data: lectureArray } = await axios.get(
               "http://localhost:8080/users/note/entire-playlist-notes",
               {
                  params: {
                     studentId: localStorage.getItem("rollNo"),
                     playlistId: playlistId,
                  },
                  headers: {
                     Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
               }
            );

            const formattedInput = lectureArray
               .map((item) => `### Lecture ${item.lectureNo}\n${item.noteContent}`)
               .join("\n\n");

            const prompt = `You are a summarizer assistant. Your job is to summarize properly by converting the json notes to a proper Markdown Notes.

Instructions:
- Use \`### Lecture 1\`, \`### Lecture 2\`, etc. as headings.
- Use bullet points (\`- \`) for key ideas or steps.
- Highlight important terms using **bold**.
- Keep summaries concise and organized.
- And give heading to each Lecture notes which summarize the whole lecture
- Add important points in blockquotes like >> syntax of markdown.
- And when you summarize the code then also give the code and use ''' syntax of markdown for code
- Add line break after each lecture notes use --- syntax of markdown

Here are the lecture notes:\n\n${formattedInput}`;

            const GEMINI_API_KEY = "AIzaSyDqP_grW4snuk6GHYhFUSLI2B2OkwfY7lw";

            const res = await fetch(
               `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
               {
                  method: "POST",
                  headers: {
                     "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                     contents: [{ parts: [{ text: prompt }] }],
                  }),
               }
            );

            const data = await res.json();
            const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";

            setNotes(reply);
            setEditedNotes(reply);
         } catch (error) {
            console.error("Error fetching notes:", error);
         }
      };

      fetchNotes();
   }, [playlistId]);

   const handleSave = async () => {
      try {
         setNotes(editedNotes);
         setIsEditing(false);
         alert("Notes saved successfully!");
      } catch (error) {
         console.error("Error saving notes:", error);
         alert("Failed to save notes");
      }
   };

   const downloadAsPDF = async () => {
      try {
         // Create a temporary container for all content
         const container = document.createElement("div");
         container.style.position = "absolute";
         container.style.left = "-9999px";
         container.style.width = "800px";
         container.style.padding = "20px";
         container.className = "markdown-notes prose";

         // Clone the preview content
         const previewContent = document.querySelector(".markdown-notes").cloneNode(true);
         container.appendChild(previewContent);
         document.body.appendChild(container);

         // Generate PDF
         const pdf = new jsPDF("p", "mm", "a4");
         const canvas = await html2canvas(container, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            scrollY: -window.scrollY,
         });

         document.body.removeChild(container);

         const imgData = canvas.toDataURL("image/png");
         const imgWidth = 190; // Max width in mm (A4 is 210mm)
         const pageHeight = 277; // A4 height in mm
         const imgHeight = (canvas.height * imgWidth) / canvas.width;

         let heightLeft = imgHeight;
         let position = 10; // Start 10mm from top
         let pageCount = 1;

         pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
         heightLeft -= pageHeight;

         // Add new pages for long content
         while (heightLeft >= 0) {
            pdf.addPage();
            position = heightLeft - imgHeight;
            pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            pageCount++;
         }

         pdf.save("lecture-notes.pdf");
      } catch (error) {
         console.error("Error generating PDF:", error);
         alert("Failed to download PDF");
      }
   };

   return (
      <div className="flex h-screen">
         {/* Left Panel - Markdown Editor */}
         <div className="w-1/2 p-4 overflow-auto border-r">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">Your Notes (Markdown)</h2>
               {isEditing ? (
                  <div className="flex gap-2">
                     <button
                        onClick={handleSave}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                        Save
                     </button>
                     <button
                        onClick={() => {
                           setEditedNotes(notes);
                           setIsEditing(false);
                        }}
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
                        Cancel
                     </button>
                  </div>
               ) : (
                  <button
                     onClick={() => setIsEditing(true)}
                     className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                     Edit
                  </button>
               )}
            </div>

            {isEditing ? (
               <textarea
                  className="w-full h-[calc(100%-50px)] p-3 border rounded font-mono text-sm"
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  spellCheck="false"
               />
            ) : (
               <pre className="text-sm whitespace-pre-wrap h-[calc(100%-50px)] overflow-auto p-3 bg-gray-50 rounded">
                  {notes}
               </pre>
            )}
         </div>

         {/* Right Panel - Markdown Preview */}
         <div className="w-1/2 p-4 overflow-auto bg-gray-50">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">Markdown Preview</h2>
               <button
                  onClick={downloadAsPDF}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-4 w-4"
                     viewBox="0 0 20 20"
                     fill="currentColor">
                     <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                     />
                  </svg>
                  Download PDF
               </button>
            </div>
            <div className="markdown-notes prose max-w-none h-[calc(100%-50px)] overflow-auto p-3 bg-white rounded">
               <ReactMarkdown>{isEditing ? editedNotes : notes}</ReactMarkdown>
            </div>
         </div>

         {/* Chatbot Button and Popup */}
         <div className="fixed right-4 bottom-4">
            <button
               onClick={() => setShowChat(!showChat)}
               className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors">
               <RiRobot3Line className="text-2xl" />
            </button>
            {showChat && (
               <ChatPopup context={isEditing ? editedNotes : notes} onClose={() => setShowChat(false)} />
            )}
         </div>
      </div>
   );
}

export default ChatbotSummarizer;
