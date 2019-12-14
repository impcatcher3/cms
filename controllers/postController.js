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
      const maxLength = 64;
      const username = req.session.authenticatedAs;
      const content = req.body.content;
      const posts = db.getCollection("posts");

      // put this elsewhere so it can be reused for editing
      if (!username) {
        res.status("401").send("401: Unauthorized");
        return;
      }
      if (content.length === 0) {
        res.status("400").send("400: Field cannot be empty")
        return;
      }
      if (content.length > maxLength) {
        res.status("400").send("400: Post exceeds " + maxLength + " characters");
        return;
      }
      // same with some of the const's above

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
      const username = req.session.authenticatedAs;
      if (!post) {
        res.status("404").send("404: " + id);
        return;
      }
      if (!username) {
        res.status("401").send("401: Unauthorized");
        return;
      }
      if (post.username !== username) {
        res.status("400").send("400: Not your post");
        return;
      }
      posts.remove(post);
      res.status("200").send("200: " + id);
    },
    edit: (req, res) => {
      const id = parseInt(req.params.id);

      // put this elsewhere so it can be reused
      const maxLength = 64;
      const username = req.session.authenticatedAs;
      const content = req.body.content;
      if (!username) {
        res.status("401").send("401: Unauthorized");
        return;
      }
      if (content.length === 0) {
        res.status("400").send("400: Field cannot be empty")
        return;
      }
      if (content.length > maxLength) {
        res.status("400").send("400: Post exceeds " + maxLength + " characters");
        return;
      }
      //

      const posts = db.getCollection("posts");
      const post = posts.findObject({$loki:id});
      if (!post) {
        res.status("404").send("404: " + id);
        return;
      }
      if (post.username !== username) {
        res.status("400").send("400: Not your post");
        return;
      }
      post.content = content;
      posts.update(post);
      res.status("200").send("200: " + id);
    }
}
