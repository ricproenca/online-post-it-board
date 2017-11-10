import Server from "ws";
import config from "../config.json";
import AppActions from "./AppActions";
import AppStore from "../stores/AppStore";

global.WebSocket = Server;

const notesTemplate = [
  {
    title: "New Note #1",
    description: "New Description  #1"
  },
  {
    title: "New Note #2",
    description: "New Description #2"
  }
];

let websocket;

const websocketPromise = new Promise((resolve, reject) => {
  websocket = new WebSocket(config.wsUrl, "echo-protocol");

  websocket.onopen = evt => {
    console.log("WebSocket opened!");
  };

  websocket.onmessage = evt => {
    console.log("WebSocket onmessage!");
    resolve(JSON.parse(evt.data));
  };

  websocket.onerror = evt => {
    console.log(`WebSocket error: ${JSON.stringify(evt)}`);
    reject(evt);
  };
});

describe("APP ACTIONS", () => {
  // My first test attempt, not yet finished
  it("Add Note", done => {
    websocketPromise.then(storeNotes => {
      expect(storeNotes).toEqual([notesTemplate[0]]);
      done();
    });
    AppActions.addNote(notesTemplate[0]);
  });
});
