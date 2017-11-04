import React from "react";
import AppStore from "../../stores/AppStore";

import Navbar from "../navbar/Navbar";
import NoteList from "../notes/Notes";

// Method to retrieve state from Stores
let getAppState = () => {
  return {
    notes: AppStore.getNotes(),
    notifications: []
  };
};

export default class App extends React.Component {
  componentDidMount() {
    AppStore.addChangeListener(this.onChange.bind(this));
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this.onChange.bind(this));
  }

  onChange() {
    this.setState(getAppState());
  }

  render() {
    const notes = getAppState().notes;
    return (
      <div>
        <Navbar />
        <NoteList notes={notes} />
      </div>
    );
  }
}