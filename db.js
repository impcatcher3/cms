const loki = require("lokijs");
db = new loki("cms.db", {
  autoload: true,
  autoloadCallback : databaseInitialize,
  autosave: true,
  autosaveInterval: 4000
});

function databaseInitialize() {
  let users = db.getCollection("users");
  if (users === null) {
    users = db.addCollection("users");
  }
  let posts = db.getCollection("posts");
  if (posts === null) {
    posts = db.addCollection("posts");
  }
}

module.exports = {
  db
};
