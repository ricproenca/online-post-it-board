import React from "react";
import ReactMarkdown from "react-markdown";

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
        <div className="note-inner-title" onClick={this.editTitle}>
          <ReactMarkdown source={this.props.title} />
        </div>
        <div className="note-inner-description" onClick={this.editDescription}>
          <ReactMarkdown source={this.props.description} />
        </div>
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
          size="45"
          maxLength="120"
          required="required"
          onBlur={this.editNote}
        />
        <div className="note-inner-description" onClick={this.editDescription}>
          <ReactMarkdown source={this.props.description} />
        </div>
      </div>
    );
  }

  renderEditDescription(className, prop) {
    return (
      <div className="note-inner">
        <div className="note-inner-title" onClick={this.editTitle}>
          <ReactMarkdown source={this.props.title} />
        </div>
        <textarea
          ref="editDescriptionInput"
          rows="22"
          cols="56"
          className={className}
          type="text"
          autoFocus={true}
          defaultValue={prop}
          maxLength="1000"
          required="required"
          onBlur={this.editNote}
        />
      </div>
    );
  }

  editTitle() {
    this.setState({
      editingTitle: true
    });
  }

  editDescription() {
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
    AppActions.addNote();
  }

  deleteNote() {
    AppActions.deleteNote(this.props.noteId);
  }
}
