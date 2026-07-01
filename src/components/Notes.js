import React, { useContext,useEffect } from "react";
import NoteContext from "../Contexts/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
const Notes = () => {
  const context = useContext(NoteContext);
  const { notes,getallnotes } = context;
  useEffect(() => {
    getallnotes()
  },[]);

  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h1>Your notes</h1>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
