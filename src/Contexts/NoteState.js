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
        {
            "_id": "6a4214179680fc34238402be",
            "user": "6a4212f69680fc34238402bd",
            "title": "shreyas title updated 23",
            "description": "hey this is shreyash's description updated 23",
            "tag": "shreyashs tag",
            "date": "2026-06-29T06:43:35.785Z",
            "__v": 0
        },
        {
            "_id": "6a4244394456a4c97e279622",
            "user": "6a4212f69680fc34238402bd",
            "title": "shreyas title",
            "description": "hey this is shreyash's description",
            "tag": "shreyashs tag",
            "date": "2026-06-29T10:08:57.414Z",
            "__v": 0
        },
        {
            "_id": "6a43929d754da2da9f5c060a",
            "user": "6a4212f69680fc34238402bd",
            "title": "shreyas title 2",
            "description": "hey this is shreyash's description 2",
            "tag": "shreyashs tag 2",
            "date": "2026-06-30T09:55:41.692Z",
            "__v": 0
        },
        {
            "_id": "6a4244394456a4c97e279622",
            "user": "6a4212f69680fc34238402bd",
            "title": "shreyas title",
            "description": "hey this is shreyash's description",
            "tag": "shreyashs tag",
            "date": "2026-06-29T10:08:57.414Z",
            "__v": 0
        },
        {
            "_id": "6a43929d754da2da9f5c060a",
            "user": "6a4212f69680fc34238402bd",
            "title": "shreyas title 2",
            "description": "hey this is shreyash's description 2",
            "tag": "shreyashs tag 2",
            "date": "2026-06-30T09:55:41.692Z",
            "__v": 0
        },
        {
            "_id": "6a4244394456a4c97e279622",
            "user": "6a4212f69680fc34238402bd",
            "title": "shreyas title",
            "description": "hey this is shreyash's description",
            "tag": "shreyashs tag",
            "date": "2026-06-29T10:08:57.414Z",
            "__v": 0
        },
        {
            "_id": "6a43929d754da2da9f5c060a",
            "user": "6a4212f69680fc34238402bd",
            "title": "shreyas title 2",
            "description": "hey this is shreyash's description 2",
            "tag": "shreyashs tag 2",
            "date": "2026-06-30T09:55:41.692Z",
            "__v": 0
        },
        {
            "_id": "6a4244394456a4c97e279622",
            "user": "6a4212f69680fc34238402bd",
            "title": "shreyas title",
            "description": "hey this is shreyash's description",
            "tag": "shreyashs tag",
            "date": "2026-06-29T10:08:57.414Z",
            "__v": 0
        },
        {
            "_id": "6a43929d754da2da9f5c060a",
            "user": "6a4212f69680fc34238402bd",
            "title": "shreyas title 2",
            "description": "hey this is shreyash's description 2",
            "tag": "shreyashs tag 2",
            "date": "2026-06-30T09:55:41.692Z",
            "__v": 0
        },
        {
            "_id": "6a4244394456a4c97e279622",
            "user": "6a4212f69680fc34238402bd",
            "title": "shreyas title",
            "description": "hey this is shreyash's description",
            "tag": "shreyashs tag",
            "date": "2026-06-29T10:08:57.414Z",
            "__v": 0
        },
        {
            "_id": "6a43929d754da2da9f5c060a",
            "user": "6a4212f69680fc34238402bd",
            "title": "shreyas title 2",
            "description": "hey this is shreyash's description 2",
            "tag": "shreyashs tag 2",
            "date": "2026-06-30T09:55:41.692Z",
            "__v": 0
        }
        ]
        const [notes, setnotes] = useState(notesInitial);
    return(
        <NoteContext.Provider value={{notes, setnotes}}>
            {props.children}
        </NoteContext.Provider>
    )
 }
export default NoteState