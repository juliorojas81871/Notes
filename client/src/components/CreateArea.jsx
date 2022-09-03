import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

const CreateArea = ({setTitle, addUpdateNote, title, setContent, content, isUpdating}) => {
  return (
    <div>
      <form className="create-note">
          <input
              name="title"
              onChange={(e) => setTitle(e.target.value)} 
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  addUpdateNote()
                }
              }}
              value={title}
              placeholder="Title"
              type="text" 

            />
          <textarea
            type="text" 
            name="content"
            onChange={(e) => setContent(e.target.value)} 
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                  addUpdateNote()
                }
            }}
            value={content}
            placeholder="Take a note..."
            rows= '3'
          />
            <Fab onClick={addUpdateNote}>{isUpdating ? <EditIcon /> : <AddIcon /> }</Fab>
        </form>
    </div>
  )
}

export default CreateArea