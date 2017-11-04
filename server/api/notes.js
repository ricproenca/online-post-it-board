import resource from "resource-router-middleware";
import notes from "../models/notes";

export default ({ config, db }) =>
  resource({
    /** Property name to store preloaded entity on `request`. */
    id: "note",

    /** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
    load(req, id, callback) {
      console.log("load notes");
      let note = notes.find(note => note.id === id),
        err = note ? null : "Not found";
      callback(err, note);
    },

    /** GET / - List all entities */
    index({ params }, res) {
      console.log("index notes");
      res.json(notes);
    },

    /** POST / - Create a new entity */
    create({ body }, res) {
      console.log("create notes");
      body.id = notes.length.toString(36);
      notes.push(body);
      res.json(body);
    },

    /** GET /:id - Return a given entity */
    read({ note }, res) {
      console.log("read notes");
      res.json(note);
    },

    /** PUT /:id - Update a given entity */
    update({ note, body }, res) {
      console.log("update notes");
      for (let key in body) {
        if (key !== "id") {
          note[key] = body[key];
        }
      }
      res.sendStatus(204);
    },

    /** DELETE /:id - Delete a given entity */
    delete({ note }, res) {
      console.log("delete notes");
      notes.splice(notes.indexOf(note), 1);
      res.sendStatus(204);
    }
  });
