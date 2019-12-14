const db = require("../db").db;
const bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports = {
    fetchAll: (req, res) => {
      const content = db.getCollection("users").data;
      res.status("200").json(content);
    },
    fetchOne: (req, res) => {
      const id = parseInt(req.params.id);
      const users = db.getCollection("users");
      const user = users.findObject({$loki:id});
      res.status("200").json(user);
    },
    delete: (req, res) => {
      const isAdmin = req.session.authenticatedAs === "admin";
      if (!isAdmin) {
        res.status("401").send("401: Unauthorized");
        return;
      }
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
      const user = req.body;
      const users = db.getCollection("users");
      if (user.username === "" || user.password === "") {
        res.status("400").send("400: Fields cannot be empty");
        return;
      }
      if (users.findObject({username:user.username}) !== null) {
        res.status("400").send("400: Duplicate username");
        return;
      }
      bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if (err) {
          res.status("500").send("500: User not created");
          return;
        }
        users.insert({
          username:user.username,
          password:hash
        });
        console.log("User created: " + user.username);
        res.status("200").send("200: User created: " + user.username);
      });
    }
}
