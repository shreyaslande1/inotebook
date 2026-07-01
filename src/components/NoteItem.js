import React, { useContext } from "react";
import NoteContext from "../Contexts/NoteContext";
const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deletenote } = context;
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <button
              onClick={() => {
                deletenote(note._id);
              }}
            >
              <i className="fa-solid fa-trash-can "></i>
            </button>

            <i className="fa-regular fa-pen-to-square mx-2"></i>
          </div>
          <p className="card-text">{note.description} </p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
