import Dispatcher from "../dispatcher/AppDispatcher";
import Constants from "../constants/AppConstants";

import AppStore from "../stores/AppStore";

const newNote = {
  title: "New Note",
  description: "New Description"
};

// TODO: When the backend is ready, please change the actions
const AppActions = {
  addNote() {
    let notes = AppStore.getNotes();
    notes.push(newNote);

    Dispatcher.handleViewAction({
      actionType: Constants.NOTES_LOADED,
      notes
    });
  },

  filterNotes() {}
};

export default AppActions;
