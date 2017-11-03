import { EventEmitter } from "events";
import _ from "lodash";

let NoteStore = _.extend({}, EventEmitter.prototype, {
  // Default data
  items: [
    {
      id: "1",
      title: "Learn Webpack",
      visibleTitle: "Learn Webpack",
      description: "Learn #webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description",
      visibleDescription: "Learn Webpack",
      tags: ["#webpack"],
      visible: true
    },
    {
      id: "2",
      title: "Learn React",
      visibleTitle: "Learn React",
      description: "Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description Learn Webpack description ",
      visibleDescription: "Learn Webpack",
      tags: ["#react"],
      visible: true
    },
    {
      id: "4",
      title: "New task",
      visibleTitle: "New task",
      description: "New description",
      visibleDescription: "New description",
      tags: [],
      visible: true
    }
  ],

  getItems: function() {
    return this.items;
  }
});

export default NoteStore;
