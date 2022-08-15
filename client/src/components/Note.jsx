import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function Note(props) {
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button><EditIcon onClick={props.update}/></button>
      <button><DeleteIcon onClick={props.remove}/></button>
    </div>
  );
}

export default Note;
