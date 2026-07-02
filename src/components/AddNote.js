import React, {useContext, useState} from 'react';
import NoteContext from '../Contexts/NoteContext';
const AddNote = (props) => {
    const context = useContext(NoteContext)
    const {addnote} = context
    const [note, setnote] = useState({title: "",  description:"", tag: ""});
    const handleonclick = (e)=>{
        e.preventDefault()
        addnote(note.title, note.description, note.tag)
        setnote({title: "",  description:"", tag: ""})
        props.showalert("note added successfully","success")
    }
    const onChange  = (e)=>{
        setnote({...note,[e.target.name] : e.target.value})
    }
  return (
    
      <div className="container my-3">
      <h1>Add a note</h1>

      <form>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={1} required value={note.title}/>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={1} required value={note.description}/>
        </div>
        <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} minLength={1} required value={note.tag}/>
        </div>
        <button disabled ={note.title.length<1 || note.description.length<1 || note.tag.length<1} type="submit" className="btn btn-primary" onClick={handleonclick}>Add Note</button>
        </form>
      
      </div>
 
  );
}

export default AddNote;
