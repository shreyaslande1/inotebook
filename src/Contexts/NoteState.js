import { useState } from "react";
import NoteContext from "./NoteContext";
//this is for learning context api's
//  const NoteState = (props)=>{
//     const s1 = {
//         "name":"shreyas",
//         "class":"5th C"
//     }
//     const [state, setstate] = useState(s1)
//     const update = ()=>{
//         setTimeout(() => {
//             setstate({
//                 "name":"vidhi",
//                 "class":"10th C"
//             })
//         }, 2000);
//     }
//     return(
//         <NoteContext.Provider value={{state, update}}>
//             {props.children}
//         </NoteContext.Provider>
//     )
//  }
const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = [
        
        ]
        const [notes, setnotes] = useState(notesInitial);
        const getallnotes = async ()=>{
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                    method: 'GET',
                    headers: {
                        'Content-Type':'application/json',
                        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmE0MjEyZjY5NjgwZmMzNDIzODQwMmJkIn0sImlhdCI6MTc4MjcxNTEyNn0.lWwWver03m4ckJAniN2FkHnZiJUtH_9I-X6Aj5rIMGc'
                    },
                   
                })
            const json = await response.json()
            console.log(json)
            setnotes(json) 
        
        }
        //add note
        const addnote = async (title, description, tag)=>{
            const response = await fetch(`${host}/api/notes/addnote`, {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmE0MjEyZjY5NjgwZmMzNDIzODQwMmJkIn0sImlhdCI6MTc4MjcxNTEyNn0.lWwWver03m4ckJAniN2FkHnZiJUtH_9I-X6Aj5rIMGc'
                    },
                    body: JSON.stringify({title, description, tag})
                })
                
            const note = await response.json();
            setnotes(notes.concat(note))
        }
        //delete note 
        const deletenote = async (id)=>{
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type':'application/json',
                        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmE0MjEyZjY5NjgwZmMzNDIzODQwMmJkIn0sImlhdCI6MTc4MjcxNTEyNn0.lWwWver03m4ckJAniN2FkHnZiJUtH_9I-X6Aj5rIMGc'
                    },
                    
                })
                const json = await response.json()
                console.log(json)
                
                console.log("deleting note with id "+id);
                const newnote = notes.filter((note)=>{return note._id!==id})
                setnotes(newnote)
        }
        //edit node
        const editnote = async (id, title, description, tag)=>{
            
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json',
                    'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmE0MjEyZjY5NjgwZmMzNDIzODQwMmJkIn0sImlhdCI6MTc4MjcxNTEyNn0.lWwWver03m4ckJAniN2FkHnZiJUtH_9I-X6Aj5rIMGc'
                },
                body: JSON.stringify({title, description, tag})
            })
            let newNotes = JSON.parse(JSON.stringify(notes));

            for (let index = 0; index < newNotes.length; index++) {
                if (newNotes[index]._id === id) {
                    newNotes[index].title = title;
                    newNotes[index].description = description;
                    newNotes[index].tag = tag;
                    break;
                }
            }

            setnotes(newNotes);
        }
            return(
        <NoteContext.Provider value={{notes, addnote, deletenote, editnote,getallnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
 }
export default NoteState