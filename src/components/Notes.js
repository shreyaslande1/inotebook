import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Contexts/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  const navigate = useNavigate()
  const context = useContext(NoteContext);
  const { notes, getallnotes, editnote } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
      getallnotes();
    }else{
      navigate("/signup")
    }
     // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refclose = useRef(null);

  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updatenote = (currentnote) => {
    ref.current.click();
    setnote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };

  const handleonclick = (e) => {
    console.log("updating the note");
    editnote(note.id, note.etitle, note.edescription, note.etag);
    refclose.current.click();
    props.showalert("updated successfully", "success");
  };

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showalert={props.showalert} />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit note
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    value={note.etitle}
                    name="etitle"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    value={note.edescription}
                    name="edescription"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    value={note.etag}
                    name="etag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                type="button"
                onClick={handleonclick}
                className="btn btn-primary"
              >
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your notes</h1>

        <div className="container mx-2">
          {notes.length === 0 && "No notes to display"}
        </div>

        {Array.isArray(notes) && notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              updatenote={updatenote}
              showalert={props.showalert}
              note={note}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;