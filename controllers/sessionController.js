const db = require("../db").db;
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const session = require("express-session");
const LokiStore = require("connect-loki")(session);

// review all
module.exports = {
  register: () => {
    const user = req.body;
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
      user.password = hash;
      users.insert({
        username:user.username,
        password:user.password
      });
      res.send("Added a user");
    });
  },
  login: (req, res) => {
    console.log("Login request");
    const form = req.body;
    const username = form.username2;
    const password = form.password2;
    const user = users.findObject({"username":username});

    if (!user) {
      res.status("404").send("Username not found");
      return;
    }
    const hash = user.password;
    bcrypt.compare(password, hash, (err, boolean) => {
      if (boolean) {
        LokiStore.authenticatedAs = username;
        console.log("Successful authentication for: " + LokiStore.authenticatedAs);
        console.log(LokiStore);
      }
      res.send(boolean);
    });
  },
  authenticatedAs: (req, res) => {
    const username = LokiStore.authenticatedAs;
    (username === undefined) ? res.send("-") : res.send(username);
  },
  logout: () => {
    if (LokiStore.authenticatedAs) {
      delete LokiStore.authenticatedAs;
      res.status("200").send("Logout complete");
    } else {
      res.status("500").send("Logout failed");
    }
  }
}
