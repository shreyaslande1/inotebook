import React from 'react'

const NoteItem = (props) => {
    const {note} = props
  return (
    <div className='col-md-3'>
        <div class="card my-3">
            <div className="card-body"> 
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quidem iusto minima hic animi, eius perferendis dolores. Velit magnam cupiditate eaque porro modi. Aliquid tempora sequi blanditiis fugit dolores eius fuga exercitationem, accusamus incidunt.</p>    
            </div>
        </div>
    </div>
  )
}

export default NoteItem
