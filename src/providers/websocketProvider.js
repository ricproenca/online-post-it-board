// import AppActions from "../actions/AppActions";
const wsUrl = "ws://localhost:3001";

const onOpen = evt => {
  console.log("websocket opened!");
};

const onMessage = evt => {
  console.log("websocket message arrived!");
};

const onError = evt => {
  console.log(`websocket error: ${JSON.stringify(evt.currentTarget.url)}`);
};

export default class ApiProvider {
  constructor() {
    this.websocket = new WebSocket(wsUrl, "echo-protocol");
  }
  startListen() {
    this.websocket.onopen = onOpen;
    this.websocket.onmessage = onMessage;
    this.websocket.onerror = onError;
  }
}
