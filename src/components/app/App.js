import React from "react";

import Navbar from "../navbar/Navbar";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: []
    };

    this.addNote = this.addNote.bind(this);
    this.filterNotes = this.filterNotes.bind(this);
  }

  render() {
    return (
      <div>
        <Navbar
          // Pass callbacks
          onAdd={this.addNote}
          onSearch={this.filterNotes}
        />
      </div>
    );
  }

  addNote() {
    console.log("## ADD NOTE");
  }

  filterNotes(text) {
    console.log("## FILTER NOTES");
  }
}
