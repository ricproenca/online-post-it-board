// TODO: Missing validation JSON.parse
import config from "../config";
import AppActions from "../actions/AppActions";

const onOpen = evt => {
  console.log("WebSocket opened!");
};

const onMessage = evt => {
  console.log("WebSocket message!");
  AppActions.loadNotes(JSON.parse(evt.data));
};

const onError = evt => {
  console.log(`WebSocket error: ${JSON.stringify(evt)}`);
};

export default class WebSocketProvider {
  constructor() {
    this.websocket = new WebSocket(config.wsUrl, "echo-protocol");
  }
  startListen() {
    this.websocket.onopen = onOpen;
    this.websocket.onmessage = onMessage;
    this.websocket.onerror = onError;
  }
}
