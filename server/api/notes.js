import resource from "resource-router-middleware";
import uuidv1 from "uuid/v1";

export default (notes, db, broadcast) =>
  resource({
    /** Property name to store preloaded entity on `request`. */
    id: "note",

    /** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
    load(req, id, callback) {
      console.log("API request load");
      let note = notes.find(note => note.id === id),
        err = note ? null : "Not found";
      callback(err, note);
    },

    /** GET / - List all entities */
    index({ params }, res) {
      console.log("API request list all");
      res.json(notes);
      broadcast(notes);
    },

    /** POST / - Create a new entity */
    create({ body }, res) {
      console.log("API request create");
      body.id = uuidv1();
      notes.push(body);
      res.json(body.id);
      broadcast(notes);
    },

    /** GET /:id - Return a given entity */
    read({ note }, res) {
      console.log("API request read");
      res.json(note);
      broadcast(notes);
    },

    /** PUT /:id - Update a given entity */
    update({ note, body }, res) {
      console.log("API request update");
      for (let key in body) {
        if (key !== "id") {
          note[key] = body[key];
        }
      }
      res.sendStatus(204);
      broadcast(notes);
    },

    /** DELETE /:id - Delete a given entity */
    delete({ note }, res) {
      console.log("API request delete", note);
      notes.splice(notes.indexOf(note), 1);
      res.sendStatus(204);
      broadcast(notes);
    }
  });
