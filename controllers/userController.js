const db = require("../db").db;
const bcrypt = require("bcryptjs");
const saltRounds = 10;

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
    },
    register: (req, res) => {
      const users = db.getCollection("users");
      const user = req.body;
      bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if (err) {
          res.status("500").send("User could not be made");
          return;
        }
        users.insert({
          username:user.username,
          password:hash
        });
        console.log("User created: " + user.username);
        res.status("200").send("User created: " + user.username);
      });
    }
}
