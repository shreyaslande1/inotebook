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
                
            const note = {
                "_id": "6a430929d754da2da9f5c060a",
                "user": "6a42012f69680fc34238402b4r",
                "title": title,
                "description": description,
                "tag": tag,
                "date": "2026-06-30T09:55:41.692Z",
                "__v": 0
            } 
            setnotes(notes.concat(note))
        }
        //delete note 
        const deletenote = (id)=>{
            console.log("deleting note with id "+id);
            const newnote = notes.filter((note)=>{note._id==id})
            setnotes(newnote)
        }
        //edit node
        const editnote = async (id, title, description, tag)=>{
            
            const response = await fetch(`${host}/api/notes/updatenote/6a430929d754da2da9f5c060a`, {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json',
                    'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmE0MjEyZjY5NjgwZmMzNDIzODQwMmJkIn0sImlhdCI6MTc4MjcxNTEyNn0.lWwWver03m4ckJAniN2FkHnZiJUtH_9I-X6Aj5rIMGc'
                },
                body: JSON.stringify({title, description, tag})
            })
            const json = response.json()
            for(let index = 0;i< notes.length; index++){
                const element = notes[index];
                if(element._id === id){
                    element._title = title;
                    element._description = description;
                    element._tag= tag;

                }
            }
        }
            return(
        <NoteContext.Provider value={{notes, addnote, deletenote, editnote,getallnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
 }
export default NoteState