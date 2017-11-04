import React from "react";

import AppActions from "../../actions/AppActions";

export default class Note extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editingTitle: false,
      editingDescription: false
    };

    this.editTitle = this.editTitle.bind(this);
    this.editDescription = this.editDescription.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.editNote = this.editNote.bind(this);
  }

  render() {
    if (this.isEditingTitle()) {
      return this.renderEditTitle("editingTitle", this.props.title);
    } else if (this.isEditingDescription()) {
      return this.renderEditDescription(
        "editingDescription",
        this.props.description
      );
    } else {
      return this.renderNote();
    }
  }

  renderNote() {
    return (
      <div className="note-inner">
        <button className="delete" onClick={this.deleteNote.bind(this)}>
          x
        </button>
        <h2 onClick={this.editTitle}>{this.props.title}</h2>
        <p onClick={this.editDescription}>{this.props.description}</p>
        <button className="add" onClick={this.addNote}>+</button>
      </div>
    );
  }

  renderEditTitle(className, prop) {
    return (
      <div className="note-inner">
        <input
          ref="editTitleInput"
          className={className}
          type="text"
          autoFocus={true}
          defaultValue={prop}
          size="30"
          maxLength="120"
          required="required"
          onBlur={this.editNote}
          onKeyPress={this.checkEnter}
        />
        <p onClick={this.editDescription}>{this.props.description}</p>
      </div>
    );
  }

  renderEditDescription(className, prop) {
    return (
      <div className="note-inner">
        <h2 onClick={this.editTitle}>{this.props.title}</h2>
        <textarea
          ref="editDescriptionInput"
          rows="15"
          cols="33"
          className={className}
          type="text"
          autoFocus={true}
          defaultValue={prop}
          maxLength="1000"
          required="required"
          onBlur={this.editNote}
          onKeyPress={this.checkEnter}
        />
      </div>
    );
  }

  editTitle() {
    console.log("Note editTitle");
    this.setState({
      editingTitle: true
    });
  }

  editDescription() {
    console.log("Note editDescription");
    this.setState({
      editingDescription: true
    });
  }

  isEditingTitle() {
    return this.state.editingTitle;
  }

  isEditingDescription() {
    return this.state.editingDescription;
  }

  checkEnter(e) {
    // found 'ENTER' key, then finish edit
    if (e.key === "Enter") {
      this.editNote();
    }
  }

  editNote() {
    console.log("Note editNote");
    const noteId = this.props.noteId;
    const noteTitle = this.refs.editTitleInput
      ? this.refs.editTitleInput.value
      : this.props.title;

    const noteDescription = this.refs.editDescriptionInput
      ? this.refs.editDescriptionInput.value
      : this.props.description;

    AppActions.editNote(noteId, noteTitle, noteDescription);

    this.setState({
      editingTitle: false,
      editingDescription: false
    });
  }

  addNote() {
    console.log("Note addNote");
    AppActions.addNote();
  }

  deleteNote() {
    console.log("Note deleteNote");
    AppActions.deleteNote(this.props.noteId);
  }
}
