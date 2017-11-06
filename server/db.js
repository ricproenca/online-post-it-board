import { MongoClient } from "mongodb";
import config from "./config.json";

export default callback => {
  // connect to a database if needed, then pass it to `callback`:

  const dbUri =
    "mongodb://" +
    config.dbUser +
    ":" +
    config.dbPassword +
    "@ds149855.mlab.com:49855/online-post-it-board";

  MongoClient.connect(dbUri, (err, database) => {
    if (err) {
      console.log("DB connection error", JSON.stringify(err));
      return;
    }
    callback(database);
  });
};
