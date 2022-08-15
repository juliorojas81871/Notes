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
  

  useEffect(() =>{
    axios.get("http://localhost:5000/get-Notes")
      .then((res) => setNotes(res.data))
      .catch((err) => console.log(err));
  });
   
  const addUpdateItem = () => {
    if (isUpdating === "") {
      axios.post("http://localhost:5000/save-Notes", { title, content })
        .then((res) => {
          console.log(res.data);
          setTitle("");
          setContent("");
        })
        .catch((err) => console.log(err));
    }
    else{
      axios.post("http://localhost:5000/update-Notes", { _id: isUpdating, title, content } )
        .then((res) => {
          console.log(res.data);
          setTitle("");
          setContent("");
          setUpdating("");
          setUpdating("");
        })
        .catch((err) => console.log(err));
    }
  }

  const deleteNote = (_id) => {
    axios.post("http://localhost:5000/delete-Notes", { _id })
      .then((res) => console.log(res.data))
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
