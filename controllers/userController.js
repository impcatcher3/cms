const db = require("../db").db;

module.exports = {
    fetchAll: (req, res) => {
      const content = db.getCollection("users").data;
      res.json(content);
    },
    fetchOne: (req, res) => {
      const id = parseInt(req.params.id);
      const users = db.getCollection("users");
      const user = users.findObject({$loki:id});
      res.status("200").json(user);
    },
    delete: (req, res) => {
      const id = parseInt(req.params.id);
      const users = db.getCollection("users");
      const user = users.findObject({$loki:id});
      if (!user) {
        res.status("404").send("404: " + id);
        return;
      }
      users.remove(user);
      res.status("200").send("200: " + id);
    }
}
