import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Note from "./Note";
import axios from "axios";

const MainBoard =() => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [isUpdating, setUpdating] = useState("");
  
  const getNotes = () => axios.get("/get-notes")
    .then((res) => setNotes(res.data))
    .catch((err) => console.log(err))

  useEffect(() =>{
    getNotes()
  }, []);

  const addUpdateNote = () => {
    if (isUpdating === "") {
      axios.post("/save-notes", { title, content })
        .then((res) => {
          setTitle("");
          setContent("");
          getNotes()
        })
        .catch((err) => console.log(err));
    }
    else{
      axios.post("/update-notes", { _id: isUpdating, title, content } )
        .then((res) => {
          setTitle("");
          setContent("");
          setUpdating("");
          getNotes()
        })
        .catch((err) => console.log(err));
    }
  }

  const deleteNote = (_id) => {
    axios.post("/delete-notes", { _id })
      .then((res) => {
        console.log(res.data); 
        getNotes()
      })
      .catch((err) => console.log(err));
  }

  const updateNote = (_id, title, content) => {
    setUpdating(_id);
    setTitle(title);
    setContent(content);
    title={title}
  }

  return (
    <div>
      <Header />
      <CreateArea 
        setTitle={setTitle}
        addUpdateNote={addUpdateNote}
        setContent={setContent}
        content={content}
        title={title}
        isUpdating={isUpdating}
      />
      {notes.map(item => 
          <Note
            key={item._id}
            id={item._id}
            title={item.title}
            content={item.content}
            onDelete={deleteNote}
            remove={() => deleteNote(item._id)}
            update={() => updateNote(item._id, item.title, item.content)}
          />
      )}
      <Footer />
    </div>
  );
}

export default MainBoard;
