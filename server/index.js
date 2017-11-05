import http from "http";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import RateLimit from "express-rate-limit";
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

// Enable CORS to allow cross-origin HTTP requests from a different domain
app.use(cors());

// Helmet default config:
// dnsPrefetchControl: controls browser DNS prefetching
// frameguard: to prevent clickjacking
// hidePoweredBy: to remove the X-Powered-By header
// hsts: for HTTP Strict Transport Security
// ieNoOpen: sets X-Download-Options for IE8+
// noSniff: to keep clients from sniffing the MIME type
// xssFilter: adds some small XSS protections
app.use(helmet({ frameguard: { action: "sameorigin" } }));

// only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
//app.enable("trust proxy");

// Protect from Brute Force and DDOS Attacks
app.use(
  new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
  })
);

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
