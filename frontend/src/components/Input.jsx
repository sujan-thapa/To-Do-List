import React, { useState } from "react";

function Input({ addNote }) {
  const [inputValue, setInputValue] = useState("");

  // Function to handle adding a new note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      addNote(inputValue); // Call the addNote function passed from the parent component
      setInputValue(""); // Clear the input field
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add new note"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // Update the input value as the user types
      />
      <button className="noteAdd" onClick={handleAddNote}>
        Add
      </button>
    </div>
  );
}

export default Input;