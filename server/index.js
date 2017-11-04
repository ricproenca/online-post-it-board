import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import initializeDb from "./db";
import middleware from "./middleware";
import api from "./api";
import config from "./config.json";
import { webpackDevHelper } from "./index.dev.js";

let app = express();
app.server = http.createServer(app);

if (process.env.NODE_ENV !== "production") {
  console.log("DEVELOPMENT ENVIRONMENT: Turning on WebPack Middleware...");
  webpackDevHelper.useWebpackMiddleware(app);
} else {
  console.log("PRODUCTION ENVIRONMENT");
}

app.set("port", process.env.PORT || 3001);

// 3rd party middleware
app.use(
  cors({
    exposedHeaders: config.corsHeaders
  })
);

app.use(
  bodyParser.json({
    limit: config.bodyLimit
  })
);

// connect to db
initializeDb(db => {
  // internal middleware
  app.use(middleware({ config, db }));

  // api router
  app.use("/api", api({ config, db }));

  app.listen(app.get("port"), () => {
    console.log(
      `Server api found at: http://localhost:${app.get("port")}/api/`
    ); // eslint-disable-line no-console
  });
});

export default app;
