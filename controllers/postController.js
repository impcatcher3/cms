const db = require("../db").db;

module.exports = {
    fetchAll: (req, res) => {
      const content = db.getCollection("posts").data;
      res.status("200").json(content);
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
      const sess = req.session;
      const username = sess.authenticatedAs;
      const content = req.body.content;
      const posts = db.getCollection("posts");

      if (!username) {
        res.status("403").send("403: No authentication");
        return;
      }

      const post = {
        username: username,
        content: content
      }

      posts.insert(post);
      res.status("200").send("200: Added a post");
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
    },
    edit: (req, res) => {
      const id = parseInt(req.params.id);
      const content = req.body.content;
      const posts = db.getCollection("posts");
      const post = posts.findObject({$loki:id});
      if (!post) {
        res.status("404").send("404: " + id);
        return;
      }
      post.content = content;
      posts.update(post);
      res.status("200").send("200: " + id);
    }
}
