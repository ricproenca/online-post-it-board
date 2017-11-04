import { EventEmitter } from "events";
import assign from "object-assign";

import Dispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";

let notes = [
  {
    id: "1",
    title: "Learn Webpack",
    visibleTitle: "Learn Webpack",
    description: "Learn #webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description",
    visibleDescription: "Learn Webpack",
    tags: ["#webpack"],
    visible: true
  },
  {
    id: "2",
    title: "Learn React",
    visibleTitle: "Learn React",
    description: "Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description ",
    visibleDescription: "Learn Webpack",
    tags: ["#react"],
    visible: true
  },
  {
    id: "3",
    title: "New task",
    visibleTitle: "New task",
    description: "New description",
    visibleDescription: "New description",
    tags: [],
    visible: true
  }
];

const setVisibilityFilterToNotes = tags => {
  let newNotes = assign([], notes);
  if (tags.length) {
    // Iterate all tags and notes
    tags.map((tag, tagIndex) => {
      return newNotes.map((note, noteIndex) => {
        // Set visible option if #tag is found
        if (note.tags.indexOf(tag) === -1) {
          note.visible = false;
        } else {
          note.visible = true;
        }
        return note;
      });
    });
  } else {
    newNotes.map((note, noteIndex) => {
      note.visible = true;
      return note;
    });
  }
  return newNotes;
};

const AppStore = assign({}, EventEmitter.prototype, {
  getNotes() {
    console.log("AppStore getNotes");
    return notes.filter(note => {
      return note.visible;
    });
  },

  emitChange() {
    console.log("AppStore emitChange");
    this.emit(AppConstants.CHANGE_EVENT);
  },

  addChangeListener(callback) {
    console.log("AppStore addChangeListener");
    this.on(AppConstants.CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    console.log("AppStore removeChangeListener");
    this.removeListener(AppConstants.CHANGE_EVENT, callback);
  }
});

// TODO: missing validations (if paylod is correct)
Dispatcher.register(payload => {
  const action = payload.action;
  console.log(`AppStore dispatch action: ${action.actionType}`);
  switch (action.actionType) {
    case AppConstants.NOTES_LOADED:
      debugger;
      this.notes = notes;
      break;

    case AppConstants.APPLY_VISIBILITY_FILTER:
      const notesFiltered = setVisibilityFilterToNotes(action.tags);
      Object.assign(notes, notesFiltered);
      break;

    default:
      console.error(`Error: Action ${action.actionType} unknown.`);
      break;
  }
  AppStore.emitChange(AppConstants.CHANGE_EVENT);
  return true;
});

export default AppStore;
