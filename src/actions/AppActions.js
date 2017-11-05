import Dispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";
import AppStore from "../stores/AppStore";
import config from "../config";
import Axios from "axios";

// Api expected status codes
const statusCreate = 200;
const statusDelete = 204;

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

const parseError = error => {
  if (error.response) {
    // The server responded with a status code that falls out of the range of 2xx
    console.log(`API error status: ${error.response.status} `);
    console.log("API error data:", error.response.data);
    console.log("API error headers:", error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.log(`API error no response: ${error.request}`);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log(`API request error: ${error.message}`);
  }
};

const parseResponse = (expectedStatus, response, msg) => {
  if (response.status === expectedStatus) {
    // The server responded with the expected status code
    console.log(msg);
  } else {
    // The server responded with an unexpected status code
    console.log(`API response unexpected status ${response.status}`);
    console.log(`API response unexpected data ${response.data}`);
  }
};

const AppActions = {
  loadNotes(notes) {
    console.log("AppActions loadNotes");
    Dispatcher.handleViewAction({
      actionType: AppConstants.NOTES_LOADED,
      notes
    });
  },

  addNote() {
    console.log("AppActions addNote");
    Axios.post(config.apiUrl, newNote)
      .then(res => {
        parseResponse(statusCreate, res, "Added new note");
      })
      .catch(function(error) {
        parseError(error);
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
    Axios.delete(config.apiUrl + noteId)
      .then(res => {
        parseResponse(statusDelete, res, "Deleted note");
      })
      .catch(function(error) {
        parseError(error);
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
