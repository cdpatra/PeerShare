import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { ImSpinner8 } from "react-icons/im";

function ChatPopup({ context, onClose, disabled }) {
   const [messages, setMessages] = useState([
      {
         sender: "bot",
         text: "Hi! I'm your PeerShare AI assistant. Ask me anything about your notes!",
      },
   ]);
   const [input, setInput] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const messagesEndRef = useRef(null);

   // Auto-scroll to bottom when messages change
   useEffect(() => {
      scrollToBottom();
   }, [messages, isLoading]);

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };

   const sendToGemini = async (userInput) => {
      setIsLoading(true);

      try {
         // Add user message immediately
         setMessages((prev) => [...prev, { sender: "user", text: userInput }]);

         const GEMINI_API_KEY = "AIzaSyDqP_grW4snuk6GHYhFUSLI2B2OkwfY7lw";
         const prompt = `You are a helpful assistant for student notes. Respond concisely and accurately based on these notes:

Context Notes:
${context || "No notes available"}

User Question:
${userInput}

Guidelines:
- Answer directly without preamble
- Be concise but thorough
- Format responses with Markdown when helpful
- If question is unrelated to notes, politely say so`;

         const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  contents: [{ parts: [{ text: prompt }] }],
                  generationConfig: {
                     temperature: 0.3,
                     maxOutputTokens: 1000,
                  },
               }),
            }
         );

         if (!res.ok) throw new Error("API request failed");

         const data = await res.json();
         const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "I couldn't generate a response. Please try again.";

         // Add AI response after receiving it
         setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      } catch (error) {
         console.error("Chat error:", error);
         setMessages((prev) => [
            ...prev,
            {
               sender: "bot",
               text: "Sorry, I encountered an error. Please try again later.",
            },
         ]);
      } finally {
         setIsLoading(false);
      }
   };

   const handleSend = () => {
      if (input.trim() && !isLoading && !disabled) {
         sendToGemini(input);
         setInput("");
      }
   };

   return (
      <div
         className={`fixed right-4 bottom-20 w-80 h-96 flex flex-col bg-white rounded-lg shadow-xl border border-gray-200 z-50`}>
         <div className="flex items-center justify-between p-3 text-white bg-blue-500 rounded-t-lg">
            <h3 className="text-lg font-semibold">Peershare Chat</h3>
            <div className="flex items-center gap-2">
               
               <a
                  href="https://www.markdownguide.org/basic-syntax/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline">
                  ? Help
               </a>
               <button
                  onClick={onClose}
                  className="w-6 h-6 flex items-center justify-center bg-red-500 rounded hover:bg-red-600">
                  ×
               </button>
            </div>
         </div>

         <div className="flex-grow p-3 space-y-2 overflow-y-auto">
            {messages.map((m, idx) => (
               <div
                  key={idx}
                  className={`p-3 rounded-md text-sm max-w-[90%] ${
                     m.sender === "bot" ? "bg-blue-50 text-gray-800 mr-auto" : "bg-green-50 text-gray-900 ml-auto"
                  }`}>
                  <ReactMarkdown>{m.text}</ReactMarkdown>
               </div>
            ))}
            {isLoading && (
               <div className="p-3 rounded-md bg-blue-50 text-gray-800 mr-auto max-w-[90%]">
                  <div className="flex items-center gap-2">
                     <ImSpinner8 className="animate-spin" />
                     <span>Thinking...</span>
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
         </div>

         <div className="p-3 border-t">
            <div className="flex gap-2">
               <input
                  type="text"
                  className={`flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                     disabled ? "bg-gray-100" : ""
                  }`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={disabled ? "Loading notes..." : "Ask about the notes..."}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  disabled={disabled || isLoading}
               />
               <button
                  onClick={handleSend}
                  disabled={disabled || isLoading || !input.trim()}
                  className={`px-4 py-2 text-white rounded ${
                     disabled || isLoading || !input.trim()
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                  }`}>
                  Send
               </button>
            </div>
         </div>
      </div>
   );
}

export default ChatPopup;
