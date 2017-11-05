import Dispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";
import AppStore from "../stores/AppStore";
import config from "../config";
import Axios from "axios";

const status200 = 200;

const newNote = {
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

const printError = error => {
  if (error.response) {
    // The server responded with a status code that falls out of the range of 2xx
    console.log(`ApiProvider Response Status: ${error.response.status}`);
    console.log(`ApiProvider Response Data: ${error.response.data}`);
    console.log(`ApiProvider Response Headers: ${error.response.headers}`);
  } else if (error.request) {
    // The request was made but no response was received
    console.log(`ApiProvider No Response: ${error.request}`);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log(`ApiProvider Error: ${error.message}`);
  }
  console.log(`ApiProvider config ${error.config}`);
};

const printUnexpectedResponse = response => {
  console.log(`Incorrect API response status ${response.status}`);
  console.log(`Incorrect API response data ${response.data}`);
};

// TODO: When the backend is ready, please change the actions
const AppActions = {
  loadNotes(notes) {
    console.log("AppActions loadNotes");
    Dispatcher.handleViewAction({
      actionType: AppConstants.NOTES_LOADED,
      notes
    });
  },

  addNote() {
    Axios.post(config.apiUrl, newNote)
      .then(res => {
        if (res.status === status200) {
          console.log(`Added new note with id ${res.data}`);
        } else {
          printUnexpectedResponse(res);
        }
      })
      .catch(function(error) {
        printError(error);
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
