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
    const notesInitial = [
        
        ]
        const [notes, setnotes] = useState(notesInitial);
        //add note
        const addnote = (title, description, tag)=>{
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
        const deletenote = ()=>{

        }
        //edit node
        const editnote = ()=>{

        }
    return(
        <NoteContext.Provider value={{notes, addnote, deletenote, editnote}}>
            {props.children}
        </NoteContext.Provider>
    )
 }
export default NoteState