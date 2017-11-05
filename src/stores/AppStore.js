import { EventEmitter } from "events";
import assign from "object-assign";

import Dispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";

let store = {
  notes: [],
  filter: []
};

const getFilteredNotes = (notes, tags) => {
  if (tags.length) {
    // eslint-disable-next-line
    return notes.filter(note => {
      for (var i = 0; i < note.tags.length; i++) {
        if (tags.indexOf(note.tags[i]) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  return notes;
};

const AppStore = assign({}, EventEmitter.prototype, {
  getState() {
    return {
      notes: this.getNotes(),
      filter: this.getFilter()
    };
  },

  getNotes() {
    console.log("AppStore getNotes");
    const notes = getFilteredNotes(assign([], store.notes), store.filter);
    return notes;
  },

  getFilter() {
    console.log("AppStore getFilter");
    return store.filter.join(" ");
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
  console.log(`AppStore dispatch action: ${JSON.stringify(action)}`);
  switch (action.actionType) {
    case AppConstants.NOTES_LOADED:
      store.notes = assign([], action.notes);
      break;

    case AppConstants.APPLY_VISIBILITY_FILTER:
      store.filter = assign([], action.tags);
      break;

    default:
      console.error(`Error: Action ${action.actionType} unknown.`);
      break;
  }
  AppStore.emitChange(AppConstants.CHANGE_EVENT);
  return true;
});

export default AppStore;
