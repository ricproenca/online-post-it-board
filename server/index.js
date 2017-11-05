import http from "http";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import websocket from "ws";
import dateFormat from "dateformat";
import initializeDb from "./db";
import notes from "./models/notes";
import config from "./config.json";
import api from "./api";

let app = express();
app.server = http.createServer(app);

app.set("port", process.env.PORT || config.port);

// Configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

console.log("### Online Post-It Board Server ###");

// connect to db
initializeDb(db => {
  // start server
  const port = app.get("port");
  const server = app.listen(port, () => {
    // eslint-disable-line no-console
    console.log(
      `${dateFormat(null, "isoUtcDateTime")} - API live on: http://localhost:${port}/api/`
    );
  });

  // start web socket server
  const wss = new websocket.Server({ server });

  let broadcast;

  if (wss) {
    // define broadcast callback
    broadcast = data => {
      // wss.clients = connected clients
      wss.clients.forEach(client => {
        client.send(JSON.stringify(data));
        console.log(
          `${dateFormat(null, "isoUtcDateTime")} - WS broadcast to all clients`
        );
      });
    };

    console.log(
      `${dateFormat(null, "isoUtcDateTime")} - WS live on: http://localhost:${port}`
    );

    wss.on("connection", (ws, req) => {
      console.log(
        `${dateFormat(null, "isoUtcDateTime")} - WS connection from: ${req.connection.remoteAddress}`
      );
      broadcast(notes);
    });
  }

  // api router
  app.use("/api", api(notes, db, broadcast));
});

export default app;
