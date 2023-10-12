import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {
  return (
    <div className="container">
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={props.onDelete}>
        <DeleteIcon/>
      </button>
    </div>
    </div>
  );
}

export default Note;
