import SocketServer from "ws";

export default (server, port) => {
  // broadcast message to all clientes
  const wss = new SocketServer.Server({ server });

  console.log(`WS live on: http://localhost:${port}`);

  wss.on("connection", (ws, req) => {
    console.log(`WS connection from: ${req.connection.remoteAddress}`);
  });

  wss.broadcast = notes => {
    // wss.clients = connected clients
    wss.clients.forEach(client => {
      client.send(JSON.stringify(notes));
      console.log("WS broadcast to all clients...");
    });
  };
};
