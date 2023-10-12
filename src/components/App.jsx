import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3001/api/getAll").then(res=> setNotes(res.data));
  },[])

  function addNote(newNote) {
    axios.post("http://localhost:3001/api/addNew",newNote).then((res)=>{
      setNotes(res.data)
    });
  }

  function deleteNote(id) {
    axios.post("http://localhost:3001/api/delete",{id}).then((res)=>{
      setNotes(res.data);
    })
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={()=>{return deleteNote(noteItem._id)}}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
