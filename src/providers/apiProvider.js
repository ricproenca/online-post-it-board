import fetchConnector from "./api/fetchApiConnector";

const validateRequest = request => {
  if (!request.callback) {
    return { valid: false, message: "ApiProvider error: no callback passed " };
  }
  if (!request.url) {
    return { valid: false, message: "ApiProvider error: no url passed " };
  }
  return { valid: true };
};

class ApiProvider {
  static fetchNotes(request) {
    const validRequest = validateRequest(request);
    validRequest.valid
      ? fetchConnector.fetchNotes(request.url, request.callback)
      : request.callback(validRequest);
  }
}

export default ApiProvider;

/*import "whatwg-fetch";
import config from "../config.json";

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

class NotesApi {
  static fetchNotes(callback) {
    fetch(config.apiUrl)
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        console.log("fetchNotes request succeeded with JSON response", data);
        if (callback) {
          callback({ data: data });
        }
      })
      .catch(error => {
        console.log("fetchNotes request failed", error);
        callback({ error: error });
      });
  }

  static fetchNote(id) {
    fetch(config.apiUrl + id)
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        console.log("fetchNote request succeeded with JSON response", data);
      })
      .catch(error => {
        console.log("fetchNote request failed", error);
      });
  }

  static addNote() {
    fetch(config.apiUrl, {
      method: "POST",
      body: JSON.stringify(config.newNote)
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        console.log("addNote request succeeded with JSON response", data);
      })
      .catch(error => {
        console.log("addNote request failed", error);
      });
  }

  static editNote(id, title, description) {
    fetch(config.apiUrl + id, {
      method: "PUT",
      body: JSON.stringify({ title: title, description: description })
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        console.log("editNote request succeeded with JSON response", data);
      })
      .catch(error => {
        console.log("editNote request failed", error);
      });
  }

  static deleteNote(id) {
    fetch(config.apiUrl + id, {
      method: "DELETE"
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        console.log("deleteNote request succeeded with JSON response", data);
      })
      .catch(error => {
        console.log("deleteNote request failed", error);
      });
  }
}

export default NotesApi;
window.NotesApi = NotesApi;
*/
