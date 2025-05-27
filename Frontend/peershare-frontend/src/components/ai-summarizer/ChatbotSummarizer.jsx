import "./markdown.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ChatPopup from "./ChatPopup";
import { RiRobot3Line } from "react-icons/ri";
import { ImSpinner8 } from "react-icons/im";
import ReactMarkdown from "react-markdown";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";

function ChatbotSummarizer() {
   const playlistId = useParams()["playlist-id"];
   const [notes, setNotes] = useState("");
   const [editedNotes, setEditedNotes] = useState("");
   const [showChat, setShowChat] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchNotes = async () => {
         setIsLoading(true);
         setError(null);

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

            // Check if notes are empty
            if (!lectureArray || lectureArray.length === 0) {
               setNotes("No notes available for this playlist.");
               setEditedNotes("No notes available for this playlist.");
               return;
            }

            const formattedInput = lectureArray
               .map((item) => `### Lecture ${item.lectureNo}\n${item.noteContent}`)
               .join("\n\n");

            const prompt = `You are a professional note summarizer. Your only task is to convert the provided lecture notes into well-formatted Markdown. Follow these instructions strictly:

1. If there are no notes provided, simply respond with "No notes available."
2. For each lecture:
   - Use ### Lecture X as the heading
   - Create a brief 1-2 sentence summary heading for the lecture
   - Organize content using:
     * Bullet points (- ) for key ideas
     * **Bold** for important terms
     * >> Blockquotes for each lecture highlighting important concepts
     * \`\`\`code blocks\`\`\` for any code snippets
3. Structure requirements:
   - Maintain original lecture numbers
   - Separate lectures with ---
   - Keep summaries concise but comprehensive
   - Preserve all technical details
   - Do not add any commentary
   - Do not include any text outside of the formatted notes

Input notes:
${formattedInput}

Formatted Markdown output:`;

            const GEMINI_API_KEY = "AIzaSyDqP_grW4snuk6GHYhFUSLI2B2OkwfY7lw";

            const res = await fetch(
               `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
               {
                  method: "POST",
                  headers: {
                     "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                     contents: [
                        {
                           parts: [{ text: prompt }],
                        },
                     ],
                     generationConfig: {
                        temperature: 0.3,
                        topP: 0.8,
                        topK: 40,
                        maxOutputTokens: 2000,
                        stopSequences: ["Note:"],
                     },
                  }),
               }
            );

            if (!res.ok) {
               throw new Error(`API request failed with status ${res.status}`);
            }

            const data = await res.json();
            const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No notes available.";

            setNotes(reply);
            setEditedNotes(reply);
         } catch (err) {
            console.error("Error fetching notes:", err);
            setError(err.message);
            setNotes("Error loading notes. Please try again.");
            setEditedNotes("Error loading notes. Please try again.");
         } finally {
            setIsLoading(false);
         }
      };

      fetchNotes();
   }, [playlistId]);

   const handleSave = async () => {
      try {
         setNotes(editedNotes);
         setIsEditing(false);
         toast.success("Notes saved successfully!");
      } catch (error) {
         console.error("Error saving notes:", error);
         toast.error("Failed to save notes");
      }
   };

   const downloadAsPDF = async () => {
      try {
         setIsLoading(true);

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
         const imgWidth = 190;
         const pageHeight = 277;
         const imgHeight = (canvas.height * imgWidth) / canvas.width;

         let heightLeft = imgHeight;
         let position = 10;
         let pageCount = 1;

         pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
         heightLeft -= pageHeight;

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
         toast.error("Failed to download PDF");
      } finally {
         setIsLoading(false);
      }
   };

   const renderContent = () => {
      if (isLoading) {
         return (
            <div className="flex flex-col items-center justify-center h-full">
               <ImSpinner8 className="animate-spin text-4xl text-blue-500 mb-4" />
               <p className="text-gray-600">Generating your notes...</p>
            </div>
         );
      }

      if (error) {
         return (
            <div className="flex flex-col items-center justify-center h-full text-red-500">
               <p>Error: {error}</p>
               <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Retry
               </button>
            </div>
         );
      }

      if (isEditing) {
         return (
            <textarea
               className="w-full h-full p-3 border rounded font-mono text-sm"
               value={editedNotes}
               onChange={(e) => setEditedNotes(e.target.value)}
               spellCheck="false"
            />
         );
      }

      return (
         <pre className="text-sm whitespace-pre-wrap h-full overflow-auto p-3 bg-gray-50 rounded">{notes}</pre>
      );
   };

   return (
      <div className="flex h-screen">
         {/* Left Panel - Markdown Editor */}
         <div className="w-1/2 p-4 overflow-auto border-r">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">Your Notes (Markdown)</h2>
               {!isLoading &&
                  !error &&
                  (isEditing ? (
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
                  ))}
            </div>
            <div className="h-[calc(100%-50px)]">{renderContent()}</div>
         </div>

         {/* Right Panel - Markdown Preview */}
         <div className="w-1/2 p-4 overflow-auto bg-gray-50">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">Markdown Preview</h2>
               {!isLoading && !error && notes !== "No notes available for this playlist." && (
                  <button
                     onClick={downloadAsPDF}
                     className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                     disabled={isLoading}>
                     {isLoading ? (
                        <ImSpinner8 className="animate-spin" />
                     ) : (
                        <>
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
                        </>
                     )}
                  </button>
               )}
            </div>
            <div className="h-[calc(100%-50px)]">
               {isLoading ? (
                  <div className="flex flex-col gap-4 items-center justify-center h-full">
                     <ImSpinner8 className="animate-spin text-4xl text-blue-500" />
                     <p className="text-gray-600">Generating your markdown notes...</p>
                  </div>
               ) : (
                  <div className="markdown-notes prose max-w-none h-full overflow-auto p-3 bg-white rounded">
                     <ReactMarkdown>{isEditing ? editedNotes : notes}</ReactMarkdown>
                  </div>
               )}
            </div>
         </div>

         {/* Chatbot Button and Popup */}
         <div className="fixed right-4 bottom-4">
            <button
               onClick={() => setShowChat(!showChat)}
               className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
               disabled={isLoading}>
               <RiRobot3Line className="text-2xl" />
            </button>
            {showChat && (
               <ChatPopup
                  context={isEditing ? editedNotes : notes}
                  onClose={() => setShowChat(false)}
                  disabled={isLoading}
               />
            )}
         </div>
      </div>
   );
}

export default ChatbotSummarizer;
