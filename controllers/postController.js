const db = require("../db").db;

module.exports = {
    fetchAll: (req, res) => {
      res.json(db.getCollection("posts").data);
    },
    fetchOne: (req, res) => {
      const id = parseInt(req.params.id);
      const posts = db.getCollection("posts");
      const post = posts.findObject({$loki:id});
      res.status("200").json(post);
    },
    count: (req, res) => {
      const count = db.getCollection("posts").count();
      res.send("Number of posts in the database: " + count);
    },
    newPost: (req, res) => {
      res.send("Cool");
    }
}
