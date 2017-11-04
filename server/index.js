import http from "http";
import express from "express";
import bodyParser from "body-parser";
import initializeDb from "./db";
import middleware from "./middleware";
import config from "./config.json";
import api from "./api";

let app = express();
app.server = http.createServer(app);

app.set("port", process.env.PORT || config.port);

// Configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set our headers to allow CORS with middleware to prevent errors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  // Remove caching so we get the most recent data
  res.setHeader("Cache-Control", "no-cache");
  next();
});

// connect to db
initializeDb(db => {
  // internal middleware
  app.use(middleware({ config, db }));

  // api router
  app.use("/api", api({ config, db }));

  // start server
  const port = app.get("port");
  app.listen(port, () => {
    // eslint-disable-line no-console
    console.log(`Server api found at: http://localhost:${port}/api/`);
  });
});

export default app;
