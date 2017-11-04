import Dispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";
import AppStore from "../stores/AppStore";

const newNote = {
  title: "New Note",
  description: "New Description"
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
  }
};

export default AppActions;
