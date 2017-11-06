import { Server } from "mock-socket";

import AppActions from "./AppActions";
import AppStore from "../stores/AppStore";
import WebsocketProvider from "../providers/websocketProvider";

global.WebSocket = Server;

const notesTemplate = [
  {
    title: "New Note",
    description: "New Description"
  },
  {
    title: "New Note",
    description: "New Description"
  }
];

const wsProvider = new WebsocketProvider();
wsProvider.startListen();

describe("APP ACTIONS", function() {
  it("Add Note", async () => {
    AppActions.addNote(notesTemplate[0]);

    const storeNotes = await AppStore.getNotes();
    expect(storeNotes).toEqual([notesTemplate[0]]);
  });
});
