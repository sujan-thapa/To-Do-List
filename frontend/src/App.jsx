import React, { useState, useEffect } from "react";
import Input from "./components/Input";
import List from "./components/List";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch notes from the API on component mount
  useEffect(() => {
    fetch("http://localhost:3000/api/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  // Function to add a new note
  const addNote = async (newNote) => {
    try {
      // Make a POST request to save the new note to the database
      const response = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes: newNote }), // Send the new note data
      });

      if (!response.ok) {
        throw new Error("Failed to save the note");
      }

      const savedNote = await response.json(); // Get the saved note from the response

      // Update the local state with the new note
      setNotes((prevNotes) => [...prevNotes, savedNote]); // Avoid stale state by using prevNotes
    } catch (error) {
      console.error("Error saving the note:", error);
    }
  };

  return (
    <div className="to-do-list">
      <h1>Notes</h1>
      <Input addNote={addNote} /> {/* Pass the addNote function as a prop */}
      <ul className="note">
        {notes.map((note) => (
          <li key={note.id}>
            <List note={note} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
