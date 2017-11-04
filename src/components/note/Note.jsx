import React from "react";

export default class Note extends React.Component {
  render() {
    return (
      <div className="note-inner">
        <button className="delete">x</button>
        <h2>{this.props.title}</h2>
        <p>{this.props.description}</p>
        <button className="add">+</button>
      </div>
    );
  }
}
