import Dispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";
import AppStore from "../stores/AppStore";

const newNote = {
  id: 10,
  title: "New Note",
  description: "New Description",
  visible: true,
  tags: []
};

const getTagsInText = text => {
  let match;
  let matches = [];
  let regexp = /#([^\s]+)/g;

  // Found in all text tags expressions (#tag)
  // eslint-disable-next-line
  while ((match = regexp.exec(text)) != null) {
    if (matches.indexOf(match[0]) === -1) {
      matches.push(match[0]);
    }
  }
  return matches;
};

// TODO: When the backend is ready, please change the actions
const AppActions = {
  addNote() {
    console.log("AppActions addNote");
    let notes = AppStore.getNotes();
    notes.push(newNote);

    Dispatcher.handleViewAction({
      actionType: AppConstants.NOTES_LOADED,
      notes
    });
  },

  filterNotes(searchText) {
    console.log("AppActions filterNotes", searchText);
    const tags = getTagsInText(searchText);
    console.log(`Tags found ${tags.length}: ${JSON.stringify(tags)}`);

    Dispatcher.handleViewAction({
      actionType: AppConstants.APPLY_VISIBILITY_FILTER,
      tags
    });
  },

  deleteNote(noteId) {
    console.log("AppActions deleteNote");
    let notes = AppStore.getNotes();
    const newNotes = notes.filter(item => item.id !== noteId);

    Dispatcher.handleViewAction({
      actionType: AppConstants.NOTES_LOADED,
      notes: newNotes
    });
  }
};

export default AppActions;
