const db = require("../db").db;

module.exports = {
    fetchAll: (req, res) => {
      res.json(db.getCollection("users").data);
    },
    fetchOne: (req, res) => {
      const id = parseInt(req.params.id);
      const posts = db.getCollection("users");
      const post = posts.findObject({$loki:id});
      res.status("200").json(post);
    },
    count: (req, res) => {
      const count = db.getCollection("users").count();
      res.send("Number of users in the database: " + count);
    }
}
