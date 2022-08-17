import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import axios from "axios";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';


function App() {
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

   
  const addUpdateItem = () => {
    if (isUpdating === "") {
      axios.post("/save-notes", { title, content })
        .then((res) => {
          console.log(res.data);
          setTitle("");
          setContent("");
          getNotes()
        })
        .catch((err) => console.log(err));
    }
    else{
      axios.post("/update-notes", { _id: isUpdating, title, content } )
        .then((res) => {
          console.log(res.data);
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
  }

  return (
    <div>
      <Header />
      <div>
      <form className="create-note">
        <input
            name="title"
            onChange={(e) => setTitle(e.target.value)} 
            value={title}
            placeholder="Title"
            type="text" 

          />
        <textarea
          type="text" 
          name="content"
          onChange={(e) => setContent(e.target.value)} 
          value={content}
          placeholder="Take a note..."
          rows= '3'
        />
          <Fab onClick={addUpdateItem}>{isUpdating ? <EditIcon /> : <AddIcon /> }</Fab>
      </form>
    </div>
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

export default App;
