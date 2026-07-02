const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchUser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

// router 1 : GET all the notes using GET "api/notes/fetchallnotes" login required
router.get('/fetchallnotes',fetchuser, async(req, res)=>{
    try{
        const notes = await Note.find({user: req.user.id})
        res.json(notes)
    }catch(error){
        console.error(error.message);
            res.status(500).send("Internal Server Error");
    }
})

// router 1 : add a new note using POST "api/notes/addnote" login required

router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min:1}),
    body('description','Description must be at least 5 charecters').isLength({min: 1}),
],
     async(req, res)=>{
        try{

            const {title,description, tag} = req.body;
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({error: errors.array()});
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const saveNote = await note.save()
            
            res.json(saveNote)
        }catch(error){
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
})

// router 3 : update a note using PUT "api/notes/updatenote/:id" login required
router.put('/updatenote/:id',fetchuser, async(req, res)=>{
    try{

    
    const {title, description, tag} = req.body;
    
    // create new object so that to replace the things with this object in the existing note
    const newNote = {}
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    //find the note to be update and update it
    let note = await Note.findById(req.params.id)
    if(!note){return res.status(404).send("not found")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote},
        res.json({note})
    );
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})
// router 4 : delete a note using DELETE "api/notes/" login required 
router.delete('/deletenote/:id',fetchuser, async(req, res)=>{
    try{

    
    // fins a note to be delete and delete it
    let note = await Note.findById(req.params.id)
    if(!note){return res.status(404).send("not found")}
    
    //allow deleteion to the valid user
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Sucess":"note has been deleted", note: note})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router