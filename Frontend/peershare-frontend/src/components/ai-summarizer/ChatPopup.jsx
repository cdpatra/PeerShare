// import { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";

// function ChatPopup({ context }) {
//    const [messages, setMessages] = useState([
//       {
//          sender: "bot",
//          text: "Hi! I'm your PeerShare AI assistant. Ask me anything about your notes!",
//       },
//    ]);
//    const [input, setInput] = useState("");
//    const [maximized, setMaximized] = useState(false);

//    const sendToGemini = async (input) => {
//       const GEMINI_API_KEY = "AIzaSyDqP_grW4snuk6GHYhFUSLI2B2OkwfY7lw";
//       const prompt = `
// You are a chat bot assistant. Your job is to respond properly.

// Here are the lecture notes for the context:\n\n${context}

// And here is the prompt, give the response
// prompt-${input}
// `;
//       const res = await fetch(
//          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
//          {
//             method: "POST",
//             headers: {
//                "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                contents: [{ parts: [{ text: prompt }] }],
//             }),
//          }
//       );

//       const data = await res.json();
//       const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";

//       setMessages((prev) => [...prev, { sender: "user", text: input }, { sender: "bot", text: reply }]);
//    };

//    const handleSend = () => {
//       if (input.trim()) {
//          sendToGemini(input);
//          setInput("");
//       }
//    };

//    return (
//       <div
//          className={`h-2/3 absolute right-8 bottom-16 border border-neutral-300 rounded-md overflow-hidden bg-white ${
//             maximized ? "fixed top-0 left-0 w-screen h-screen z-50" : ""
//          }`}>
//          <div className="flex items-center justify-between p-2 bg-gray-100 border-b">
//             <h3 className="text-lg font-semibold">Gemini Chat</h3>
//             <div className="flex gap-2">
//                <a
//                   href="https://www.markdownguide.org/basic-syntax/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-sm text-blue-500 hover:underline">
//                   ? Markdown Help
//                </a>
//                <button onClick={() => setMaximized(!maximized)} className="px-3 py-1 text-sm bg-gray-200 rounded">
//                   {maximized ? "Minimize" : "Maximize"}
//                </button>
//             </div>
//          </div>

//          <div className="flex flex-col h-[90%]">
//             <div className="flex-grow p-4 space-y-4 overflow-y-auto">
//                {messages.map((m, idx) => (
//                   <div
//                      key={idx}
//                      className={`p-3 rounded-md text-sm ${
//                         m.sender === "bot" ? "bg-blue-50 text-gray-800" : "bg-green-100 text-gray-900"
//                      }`}>
//                      <ReactMarkdown>{m.text}</ReactMarkdown>
//                   </div>
//                ))}
//             </div>

//             <div className="flex gap-2 p-4 border-t">
//                <input
//                   type="text"
//                   className="flex-grow p-2 border rounded"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   placeholder="Ask about the notes..."
//                />
//                <button onClick={handleSend} className="px-4 py-2 text-white bg-blue-500 rounded">
//                   Send
//                </button>
//             </div>
//          </div>
//       </div>
//    );
// }

// export default ChatPopup;

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function ChatPopup({ context, onClose }) {
   const [messages, setMessages] = useState([
      {
         sender: "bot",
         text: "Hi! I'm your PeerShare AI assistant. Ask me anything about your notes!",
      },
   ]);
   const [input, setInput] = useState("");
   const [maximized, setMaximized] = useState(false);

   const sendToGemini = async (input) => {
      const GEMINI_API_KEY = "AIzaSyDqP_grW4snuk6GHYhFUSLI2B2OkwfY7lw";
      const prompt = `You are a chat bot assistant. Your job is to respond properly.

Here are the lecture notes for the context:\n\n${context}

And here is the prompt, give the response
prompt-${input}`;

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

      setMessages((prev) => [...prev, { sender: "user", text: input }, { sender: "bot", text: reply }]);
   };

   const handleSend = () => {
      if (input.trim()) {
         sendToGemini(input);
         setInput("");
      }
   };

   return (
      <div
         className={`fixed right-4 bottom-20 w-80 h-96 flex flex-col bg-white rounded-lg shadow-xl border border-gray-200 z-50 ${
            maximized ? "fixed top-4 left-4 right-4 bottom-4 w-auto h-auto" : ""
         }`}>
         <div className="flex items-center justify-between p-3 bg-blue-500 text-white rounded-t-lg">
            <h3 className="text-lg font-semibold">Gemini Chat</h3>
            <div className="flex gap-2 items-center">
               <a
                  href="https://www.markdownguide.org/basic-syntax/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white hover:underline">
                  ? Help
               </a>
               <button onClick={onClose} className="px-2 py-1 text-sm bg-red-500 rounded">
                  ×
               </button>
            </div>
         </div>

         <div className="flex-grow p-3 overflow-y-auto space-y-2">
            {messages.map((m, idx) => (
               <div
                  key={idx}
                  className={`p-3 rounded-md text-sm max-w-[90%] ${
                     m.sender === "bot" ? "bg-blue-50 text-gray-800 mr-auto" : "bg-green-50 text-gray-900 ml-auto"
                  }`}>
                  <ReactMarkdown>{m.text}</ReactMarkdown>
               </div>
            ))}
         </div>

         <div className="p-3 border-t">
            <div className="flex gap-2">
               <input
                  type="text"
                  className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about the notes..."
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
               />
               <button onClick={handleSend} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                  Send
               </button>
            </div>
         </div>
      </div>
   );
}

export default ChatPopup;