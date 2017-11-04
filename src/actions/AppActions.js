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
  loadNotes(notes) {
    console.log("AppActions addNote");
    Dispatcher.handleViewAction({
      actionType: AppConstants.NOTES_LOADED,
      notes
    });
  },

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
    console.log("AppActions deleteNote", noteId);
    let notes = AppStore.getNotes();
    const newNotes = notes.filter(item => item.id !== noteId);

    Dispatcher.handleViewAction({
      actionType: AppConstants.NOTES_LOADED,
      notes: newNotes
    });
  },

  editNote(noteId, noteTitle, noteDescription) {
    console.log("AppActions editNote", noteId, noteTitle, noteDescription);
    const notes = AppStore.getNotes();

    const notesFiltered = notes.filter(item => item.id === noteId);
    if (notesFiltered.length > 1) {
      console.error(`Found duplicate IDs`);
      return;
    }

    const note = notesFiltered[0];
    note.title = noteTitle;
    note.description = noteDescription;

    Dispatcher.handleViewAction({
      actionType: AppConstants.NOTES_LOADED,
      notes: notes
    });
  }
};

export default AppActions;
