import resource from "resource-router-middleware";
import uuidv1 from "uuid/v1";

import config from "../config.json";

const getTagsInText = text => {
  let match;
  let matches = [];
  let regexp = /#([^\s]+)/g;

  // Found in all text tags expressions (#tag)
  // eslint-disable-next-line
  while ((match = regexp.exec(text)) != null) {
    if (matches.indexOf(match[0]) === -1) {
      matches.push(match[0]);
    }
  }
  return matches;
};

const validateNote = note => {
  if (
    note.title.length > config.maxTitleLength ||
    note.description.length > config.maxDescriptionLength
  ) {
    return false;
  }
  return true;
};

export default (notes, db, broadcast) =>
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
      console.log("API request list all");
      res.json(notes);
      broadcast(notes);
    },

    /** POST / - Create a new entity */
    create({ body }, res) {
      console.log("API request create");

      if (!validateNote(body)) {
        res.sendStatus(400);
        return;
      }

      body.id = uuidv1();
      body.tags = []
        .concat(getTagsInText(body.title))
        .concat(getTagsInText(body.description));

      notes.push(body);
      res.sendStatus(204);
      broadcast(notes);
    },

    /** GET /:id - Return a given entity */
    read({ note }, res) {
      console.log(`API request read ${note.id}`);
      res.json(note);
      broadcast(notes);
    },

    /** PUT /:id - Update a given entity */
    update({ note, body }, res) {
      console.log(`API request update ${note.id}`);

      if (!validateNote(body)) {
        res.sendStatus(400);
        return;
      }

      body.tags = []
        .concat(getTagsInText(body.title))
        .concat(getTagsInText(body.description));

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
      console.log(`API request delete ${note.id}`);
      notes.splice(notes.indexOf(note), 1);
      broadcast(notes);
    }
  });
