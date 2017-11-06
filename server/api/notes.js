import resource from "resource-router-middleware";
import uuidv1 from "uuid/v1";
import dateFormat from "dateformat";

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

export default (db, broadcast) =>
  resource({
    /** Property name to store preloaded entity on `request`. */
    id: "note",

    /** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
    load(req, id, callback) {
      db
        .collection("notes")
        .find()
        .toArray(function(err, results) {
          if (err) {
            res.sendStatus(500);
            return;
          }
          let note = results.find(note => note.id === id);
          const notFoundMessage = note ? null : "Not found";
          callback(notFoundMessage, note);
        });
    },

    /** GET / - List all entities */
    index({ params }, res) {
      console.log(
        `${dateFormat(null, "isoUtcDateTime")} - API REQUEST get all`
      );

      db
        .collection("notes")
        .find()
        .toArray(function(err, results) {
          if (err) {
            res.sendStatus(500);
            return;
          }
          res.json(results); // should respond?
          broadcast(results);
        });
    },

    /** POST / - Create a new entity */
    create({ body }, res) {
      console.log(`${dateFormat(null, "isoUtcDateTime")} - REQUEST create`);

      if (!validateNote(body)) {
        res.sendStatus(400);
        return;
      }

      body.id = uuidv1();
      body._id = uuidv1();
      body.tags = []
        .concat(getTagsInText(body.title))
        .concat(getTagsInText(body.description));

      db.collection("notes").save(body, (err, result) => {
        if (err) {
          return console.log(err);
        }
        res.sendStatus(204);

        db
          .collection("notes")
          .find()
          .toArray(function(err, results) {
            broadcast(results);
          });
      });
    },

    /** GET /:id - Return a given entity */
    read({ note }, res) {
      console.log(
        `${dateFormat(null, "isoUtcDateTime")} - REQUEST read [${note.id}]`
      );
      res.json(results);
      broadcast(results);
    },

    /** PUT /:id - Update a given entity */
    update({ note, body }, res) {
      console.log(
        `${dateFormat(null, "isoUtcDateTime")} - REQUEST update [${note.id}]`
      );

      if (!validateNote(body)) {
        res.sendStatus(400);
        return;
      }

      body.id = note.id;
      body.tags = []
        .concat(getTagsInText(body.title))
        .concat(getTagsInText(body.description));

      db
        .collection("notes")
        .updateOne({ id: body.id }, { $set: body }, (err, result) => {
          if (err) {
            return console.log(err);
          }
          res.sendStatus(204);

          db
            .collection("notes")
            .find()
            .toArray(function(err, results) {
              broadcast(results);
            });
        });
    },

    /** DELETE /:id - Delete a given entity */
    delete({ note }, res) {
      console.log(
        `${dateFormat(null, "isoUtcDateTime")} - REQUEST delete [${note.id}]`
      );

      db.collection("notes").deleteOne({ id: note.id }, (err, result) => {
        if (err) {
          return console.log(err);
        }
        res.sendStatus(204);

        db
          .collection("notes")
          .find()
          .toArray(function(err, results) {
            broadcast(results);
          });
      });
    }
  });
