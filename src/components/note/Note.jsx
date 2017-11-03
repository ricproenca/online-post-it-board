import React from "react";

export default class Note extends React.Component {
  render() {
    return (
      <div className="note-inner">
        <h2>{this.props.title}</h2>
        <p>{this.props.description}</p>
      </div>
    );
  }
}
