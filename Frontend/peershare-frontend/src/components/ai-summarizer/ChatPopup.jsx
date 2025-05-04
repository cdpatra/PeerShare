import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

function ChatPopup({ context }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm your Gemini assistant. Ask me anything about your notes!",
    },
  ]);
  const [input, setInput] = useState("");
  const [maximized, setMaximized] = useState(false);

  const sendToGemini = async (msg) => {
    const GEMINI_API_KEY = "AIzaSyDqP_grW4snuk6GHYhFUSLI2B2OkwfY7lw";
    const prompt = `
You are a summarization assistant. Your job is to summarize the following lecture notes in clean, readable **Markdown format**.

Instructions:
- Use \`### Lecture 1\`, \`### Lecture 2\`, etc. as headings.
- Use bullet points (\`- \`) for key ideas or steps.
- Highlight important terms using **bold**.
- Keep summaries concise and organized.

Here are the lecture notes:\n\n${formattedInput}
`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-pro:generateContent?key=${GEMINI_API_KEY}`,
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

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: msg },
      { sender: "bot", text: reply },
    ]);
  };

  const handleSend = () => {
    if (input.trim()) {
      sendToGemini(input);
      setInput("");
    }
  };

  return (
    <div className={`h-full border-l bg-white ${maximized ? "fixed top-0 left-0 w-screen h-screen z-50" : ""}`}>
      <div className="flex items-center justify-between p-2 bg-gray-100 border-b">
        <h3 className="text-lg font-semibold">Gemini Chat</h3>
        <div className="flex gap-2">
          <a
            href="https://www.markdownguide.org/basic-syntax/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline"
          >
            ? Markdown Help
          </a>
          <button
            onClick={() => setMaximized(!maximized)}
            className="px-3 py-1 text-sm bg-gray-200 rounded"
          >
            {maximized ? "Minimize" : "Maximize"}
          </button>
        </div>
      </div>

      <div className="flex flex-col h-[90%]">
        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-md text-sm ${
                m.sender === "bot" ? "bg-blue-50 text-gray-800" : "bg-green-100 text-gray-900"
              }`}
            >
              <ReactMarkdown>{m.text}</ReactMarkdown>
            </div>
          ))}
        </div>

        <div className="flex gap-2 p-4 border-t">
          <input
            type="text"
            className="flex-grow p-2 border rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the notes..."
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPopup;
