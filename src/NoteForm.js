import React from 'react'
import RichTextEditor from 'react-rte'

import './NoteForm.css'

class NoteForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            note: this.blankNote(),
            editorValue: RichTextEditor.createEmptyValue(),
        }
    }

    componentWillReceiveProps = (nextProps) => {
        const nextId = nextProps.currentNoteId
        const note = nextProps.notes[nextId] || this.blankNote()

        let editorValue = this.state.editorValue
        if (editorValue.toString('html') !== note.body) {
            editorValue = RichTextEditor.createValueFromString(note.body, 'html')
        }

        this.setState({ note, editorValue })
    }

    blankNote = () => {
        return {
        id: null,
            title: '',
            body: ''
        }
    }

    handleChange = (ev) => {
        const note = {...this.state.note}
        note[ev.target.name] = ev.target.value
        this.setState(
            { note },
            () => this.props.saveNote(note)
            )
    }

    handleEditorChange = (editorValue) => {
        const note = {...this.state.note}
        note.body = editorValue.toString('html')
        this.setState(
            { note, editorValue },
            () => this.props.saveNote(note)
        )
    }

    render() {
        return (
            <div className="NoteForm">
                <div className="form-actions">
                    <button 
                    type="button" 
                    onClick={this.props.removeCurrentNote}
                    >
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
                <form>
                    <p>
                        <input
                        type="text"
                        name="title"
                        placeholder="Title your note"
                        value={this.state.note.title}
                        onChange={this.handleChange}
                        />
                    </p>
                    
                    <RichTextEditor 
                        name="body" 
                        value={this.state.editorValue}  
                        onChange={this.handleEditorChange}
                    ></RichTextEditor>
                </form>
            </div>
        )
    }
}

export default NoteForm