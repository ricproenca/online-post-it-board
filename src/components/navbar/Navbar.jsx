import React from "react";

import AppActions from "../../actions/AppActions";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: ""
    };

    this.addNote = this.addNote.bind(this);

    this.updatesearchText = this.updatesearchText.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
  }

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
              type="text"
              autoFocus={true}
              size="32"
              maxLength="120"
              required="required"
              value={this.state.searchText}
              onChange={this.updatesearchText}
              onKeyPress={this.checkEnter}
              placeholder="Place #tags here"
            />
            <button type="submit" value="Submit" onClick={this.finishEdit}>
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

  updatesearchText(e) {
    this.setState({ searchText: e.target.value });
    this.checkEnter(e);
  }

  checkEnter(e) {
    // found 'ENTER' key, then finish edit
    if (e.key === "Enter") {
      this.finishEdit(e);
    }
  }

  finishEdit() {
    // Pass text to parent
    this.props.onSearch(this.state.searchText);
  }
}
