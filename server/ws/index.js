import SocketServer from "ws";

export default server => {
  // broadcast message to all clientes
  const wss = new SocketServer.Server({ server });

  wss.on("connection", ws => {
    console.log(
      `Online Post-It Board Server: WS connection on: http://localhost:3001`
    );
  });

  wss.broadcast = notes => {
    // wss.clients = connected clients
    wss.clients.forEach(client => {
      client.send(JSON.stringify(notes));
      console.log("Broadcast all notes to clients");
    });
  };
};
