import uuidv1 from "uuid/v1";

// our example model is just an Array
const notes = [
  {
    id: uuidv1(),
    title: "Learn Webpack",
    description: "#webpack is a module bundler. You can use a separate task runner while leaving it to take care of bundling, however this line has become blurred as the community has developed plugins for it. Sometimes these plugins are used to perform tasks that are usually done outside of webpack, for example cleaning the build directory or deploying the build.",
    tags: ["#webpack"],
    visible: true
  },
  {
    id: uuidv1(),
    title: "Learn React",
    description: "Facebook's #react, a JavaScript library, is a component based view abstraction. A component could be a form input, button, or any other element in your user interface. This provides an interesting contrast to earlier approaches as React isn't bound to the DOM by design. You can use it to implement mobile applications for example.",
    tags: ["#react"],
    visible: true
  },
  {
    id: uuidv1(),
    title: "New task",
    description: "New description",
    tags: [],
    visible: true
  }
];
export default notes;
