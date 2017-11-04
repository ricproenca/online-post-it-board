import { EventEmitter } from "events";
import assign from "object-assign";

import Dispatcher from "../dispatcher/AppDispatcher";
import Constants from "../constants/AppConstants";

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

const AppStore = assign({}, EventEmitter.prototype, {
  getNotes() {
    console.log("getNotes");
    return notes;
  },

  addNote() {
    console.log("AppStore addNote");
  },

  editNote() {
    console.log("AppStore editNote");
  },

  deleteNotes() {
    console.log("AppStore deleteNotes");
  },

  filterNotes() {
    console.log("AppStore filterNotes");
  },

  emitChange() {
    console.log("AppStore emitChange");
    this.emit(Constants.CHANGE_EVENT);
  },
  addChangeListener(callback) {
    console.log("AppStore addChangeListener");
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    console.log("AppStore removeChangeListener");
    this.removeListener(Constants.CHANGE_EVENT, callback);
  }
});

Dispatcher.register(payload => {
  const action = payload.action;
  console.log(`AppStore dispatch action: ${action.actionType}`);
  switch (action.actionType) {
    case Constants.LOAD_NOTES:
      break;

    default:
      console.error(`Error: Action ${action.actionType} unknown.`);
      break;
  }
  AppStore.emitChange(Constants.CHANGE_EVENT);
  return true;
});

export default AppStore;
