import config from "../config";
import AppActions from "../actions/AppActions";

const onOpen = evt => {
  console.log("Provider WebSocket opened!");
};

const onMessage = evt => {
  console.log("Provider WebSocket message!", evt.data);
  AppActions.loadNotes(JSON.parse(evt.data));
};

const onError = evt => {
  console.log(
    `Provider WebSocket error: ${JSON.stringify(evt.currentTarget.url)}`
  );
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
