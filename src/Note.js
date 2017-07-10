import React from 'react'

const Note = ({setCurrentNote, note}) => {
    const handleClick = () => {
        setCurrentNote(note)
    }
    return(
        <a className="active" onClick={handleClick}>
            <li>
                <div className="note">
                    <div className="note-title">
                        {note.title}
                    </div>
                    <div 
                        className="note-body"
                        dangerouslySetInnerHTML={{__html: note.body}}
                    >
                    </div>
                </div>
            </li>
        </a>
    )
}

export default Note