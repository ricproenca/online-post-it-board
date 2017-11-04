import React from "react";

export default class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ""
    };

    this.updateInputValue = this.updateInputValue.bind(this);
    this.finishAdd = this.finishAdd.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
  }

  render() {
    return (
      <div className="navbar">
        <p className="tags">
          <span className="add-note-input">
            <button type="submit" value="Add Note" onClick={this.finishAdd}>
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
              value={this.state.inputValue}
              onChange={this.updateInputValue}
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

  updateInputValue(e) {
    this.setState({ inputValue: e.target.value });
    this.checkEnter(e);
  }

  checkEnter(e) {
    // found 'ENTER' key, then finish edit
    if (e.key === "Enter") {
      this.finishEdit(e);
    }
  }

  finishAdd() {
    // Callback to add note
    this.props.onAdd();
  }

  finishEdit() {
    // Pass text to parent
    this.props.onSearch(this.state.inputValue);
  }
}
