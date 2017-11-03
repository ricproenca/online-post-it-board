import React from "react";
import NoteStore from "../../stores/NoteStore";

import Navbar from "../navbar/Navbar";
import NoteList from "../notes/Notes";

// Method to retrieve state from Stores
let getListState = () => {
  return {
    items: NoteStore.getItems()
  };
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = getListState();

    this.addNote = this.addNote.bind(this);
    this.filterNotes = this.filterNotes.bind(this);
  }

  render() {
    let items = NoteStore.getItems();

    return (
      <div>
        <Navbar onAdd={this.addNote} onSearch={this.filterNotes} />
        <NoteList notes={items} />
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
