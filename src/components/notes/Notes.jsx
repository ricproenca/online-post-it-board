import React from "react";

import Note from "../note/Note";

export default class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.renderNote = this.renderNote.bind(this);
  }

  render() {
    const notes = this.props.notes;
    return (
      <ul className="notes">{notes ? notes.map(this.renderNote) : null}</ul>
    );
  }

  renderNote(note) {
    return (
      <li className="note" key={`note-${note.id}`}>
        <Note title={note.title} description={note.description} />
      </li>
    );
  }
}
