const db = require("../db").db;

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
      // code here
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
