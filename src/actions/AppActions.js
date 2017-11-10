import Dispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";
import config from "../config";

import apiProvider from "../providers/apiProvider";

// const getTagsInText = text => {
//   let match;
//   let matches = [];
//   let regexp = /#([^\s]+)/g;

//   // Found in all text tags expressions (#tag)
//   // eslint-disable-next-line
//   while ((match = regexp.exec(text)) != null) {
//     if (matches.indexOf(match[0]) === -1) {
//       matches.push(match[0]);
//     }
//   }
//   return matches;
// };

// const parseError = error => {
//   if (error.response) {
//     // The server responded with a status code that falls out of the range of 2xx
//     console.log(`API error status: ${error.response.status} `);
//     console.log("API error headers:", error.response.headers);
//   } else if (error.request) {
//     // The request was made but no response was received
//     console.log(`API error no response: ${error}`);
//   } else {
//     // Something happened in setting up the request that triggered an Error
//     console.log(`API request error: ${error.message}`);
//   }
// };

// const parseResponse = (expectedStatus, response, msg) => {
//   console.log("----------");
//   console.log(response.status, expectedStatus);
//   if (response.status === expectedStatus) {
//     // The server responded with the expected status code
//     console.log(msg);
//   } else {
//     // The server responded with an unexpected status code
//     console.log(`API response unexpected status ${response.status}`);
//     console.log(`API response unexpected data ${response.data}`);
//   }
// };

const noobFn = _ => {};

const loadNotes = notes => {
  console.log("ACTION: loadNotes", notes);
  Dispatcher.handleViewAction({
    actionType: AppConstants.NOTES_LOADED,
    notes
  });
};

const AppActions = {
  loadNotes: loadNotes,

  fetchNotes() {
    var request = {
      url: config.apiUrl,
      callback: loadNotes
    };

    apiProvider.fetchNotes(request);
  }
};

export default AppActions;
window.AppActions = AppActions;

/*

  addNote() {
    Axios.post(config.apiUrl, newNote)
      .then(res => {
        console.log("received", res);
        parseResponse(statusCreate, res, "Added new note");
        Dispatcher.handleViewAction({
          actionType: AppConstants.APPLY_VISIBILITY_FILTER,
          tags: ""
        });
      })
      .catch(function(error) {
        parseError(error);
      });
  },

  filterNotes(searchText) {
    const tags = getTagsInText(searchText);

    Dispatcher.handleViewAction({
      actionType: AppConstants.APPLY_VISIBILITY_FILTER,
      tags
    });
  },

  deleteNote(noteId) {
    Axios.delete(config.apiUrl + noteId)
      .then(res => {
        parseResponse(statusDelete, res, `Deleted note with id ${noteId}`);
      })
      .catch(function(error) {
        parseError(error);
      });
  },

  editNote(noteId, noteTitle, noteDescription) {
    Axios.put(config.apiUrl + noteId, {
      title: noteTitle,
      description: noteDescription
    })
      .then(res => {
        parseResponse(statusEdit, res, `Edited note with id ${noteId}`);
      })
      .catch(function(error) {
        parseError(error);
      });
  }
};

export default AppActions;
*/
