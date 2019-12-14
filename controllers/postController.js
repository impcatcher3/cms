const db = require("../db").db;
const session = require("express-session");
const LokiStore = require("connect-loki")(session);

module.exports = {
    fetchAll: (req, res) => {
      const content = db.getCollection("posts").data;
      res.json(content);
    },
    fetchOne: (req, res) => {
      const id = parseInt(req.params.id);
      const posts = db.getCollection("posts");
      const post = posts.findObject({$loki:id});
      if (!post) {
        res.status("404").send("404: " + id);
        return;
      }
      res.status("200").json(post);
    },
    create: (req, res) => {
      // LokiStore is here but the data is not in there
      const username = LokiStore.authenticatedAs;
      const content = req.body.content;
      const posts = db.getCollection("posts");

      console.log("LokiStore username: " + username);

      if (!username) {
        res.status("403").send("No authentication");
        return;
      }

      const post = {
        username: username,
        content: content
      }

      posts.insert(post);
      res.status("200").send("Added a post");
    },
    delete: (req, res) => {
      const id = parseInt(req.params.id);
      const posts = db.getCollection("posts");
      const post = posts.findObject({$loki:id});
      if (!post) {
        res.status("404").send("404: " + id);
        return;
      }
      posts.remove(post);
      res.status("200").send("200: " + id);
    }
}
