import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ChatPopup from "./ChatPopup";

function ChatbotSummarizer() {
  const { playlistId } = useParams();
  const [notes, setNotes] = useState("");
  const [showEditor, setShowEditor] = useState(true);

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

        setNotes(formattedInput);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [playlistId]);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 overflow-auto border-r">
        <h2 className="mb-4 text-xl font-bold">Your Notes (Markdown)</h2>
        <pre className="text-sm whitespace-pre-wrap">{notes}</pre>
      </div>
      <div className="w-1/2">
        <ChatPopup context={notes} />
      </div>
    </div>
  );
}

export default ChatbotSummarizer;