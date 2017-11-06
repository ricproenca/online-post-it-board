import { version } from "../../package.json";
import { Router } from "express";
import Notes from "./notes";

export default (db, broadcast) => {
  let api = Router();

  // mount the notes resource
  api.use("/notes", Notes(db, broadcast));

  // perhaps expose some API metadata at the root
  api.get("/", (req, res) => {
    res.json({ version });
  });

  return api;
};
