import React from "react";

import AppActions from "../../actions/AppActions";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.addNote = this.addNote.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.filterNotes = this.filterNotes.bind(this);
  }

  // TODO:
  // maybe a reset button to clean up input text?
  // maybe a delete all notes button?
  render() {
    return (
      <div className="navbar">
        <p className="tags">
          <span className="add-note-input">
            <button type="submit" value="Add Note" onClick={this.addNote}>
              Add Note
            </button>
          </span>
          <span className="tags-input">
            <input
              ref="tagSearchInput"
              type="text"
              autoFocus={true}
              size="32"
              maxLength="120"
              required="required"
              onKeyPress={this.checkEnter}
              placeholder="Place #tags here"
            />
            <button type="submit" value="Submit" onClick={this.filterNotes}>
              Search
            </button>
          </span>
        </p>
      </div>
    );
  }

  addNote() {
    console.log("Navbar addNote");
    AppActions.addNote();
  }

  checkEnter(e) {
    // found 'ENTER' key, then finish edit
    if (e.key === "Enter") {
      this.filterNotes(e);
    }
  }

  filterNotes() {
    console.log("Navbar filterNotes");
    AppActions.filterNotes(this.refs.tagSearchInput.value);
  }
}
