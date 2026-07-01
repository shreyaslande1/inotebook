import React, { useContext } from "react";
import NoteContext from "../Contexts/NoteContext";
const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deletenote } = context;
  const { note, updatenote } = props;
  return (
    <div className="col-md-4">
      <div className="card my-4">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <button className="mx-3"
              onClick={() => {
                deletenote(note._id);
              }}
            >
              <i className="fa-solid fa-trash-can "></i>
            </button>
            <button
              onClick={() => {
                updatenote(note)
              }}
            >
            <i className="fa-regular fa-pen-to-square mx-2"></i>
            </button>
          </div>
          <p className="card-text">{note.description} </p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
