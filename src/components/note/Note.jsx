import React from "react";

import AppActions from "../../actions/AppActions";

export default class Note extends React.Component {
  render() {
    return (
      <div className="note-inner">
        <button className="delete">x</button>
        <h2>{this.props.title}</h2>
        <p>{this.props.description}</p>
        <button className="add" onClick={this.addNote}>+</button>
      </div>
    );
  }

  addNote() {
    console.log("Note addNote");
    AppActions.addNote();
  }
}
