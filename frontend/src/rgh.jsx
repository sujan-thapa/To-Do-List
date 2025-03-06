import React, { useState, useEffect } from 'react'
import Input from './components/Input'
import List from './components/List'
import "./App.css"; 


function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/notes')
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error('Error fetching users:', error));


    // fetch('/api/users')
    //   .then((response) => response.json())
    //   .then((data) => setUsers(data))
    //   .catch((error) => console.error('Error fetching users:', error));


    // fetch(`${import.meta.env.VITE_API_URL}/api/users`)
    //   .then((response) => response.json())
    //   .then((data) => setUsers(data))
    //   .catch((error) => console.error('Error fetching users:', error));

  }, []);


  // Function to add a new note
  const addNote = (newNote) => {
    const newNoteObject = {
      id: notes.length + 5, // Generate a unique ID (you can use a better ID generation method)
      notes: newNote, // Set the note content
    };
    setNotes([...notes, newNoteObject]); // Add the new note to the notes state
  };

  return (
    <div className='to-do-list'>
      <h1>Notes</h1>
      <Input addNote={addNote} /> {/* Pass the addNote function as a prop */}
      {/* {console.log(users)} */}
      <ul className='note'>
        {notes.map((note)=>(
          <li key={note.id}>
            <List note={note} />
          </li>
        ))}
      </ul>
    </div>


  )
}

export default App
