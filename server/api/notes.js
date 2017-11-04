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
      let note = notes.find(note => note.id === id),
        err = note ? null : "Not found";
      callback(err, note);
    },

    /** GET / - List all entities */
    index({ params }, res) {
      res.json(notes);
    },

    /** POST / - Create a new entity */
    create({ body }, res) {
      body.id = notes.length.toString(36);
      notes.push(body);
      res.json(body);
    },

    /** GET /:id - Return a given entity */
    read({ note }, res) {
      res.json(note);
    },

    /** PUT /:id - Update a given entity */
    update({ note, body }, res) {
      for (let key in body) {
        if (key !== "id") {
          note[key] = body[key];
        }
      }
      res.sendStatus(204);
    },

    /** DELETE /:id - Delete a given entity */
    delete({ note }, res) {
      notes.splice(notes.indexOf(note), 1);
      res.sendStatus(204);
    }
  });
