const db = require("../db").db;
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const session = require("express-session");
const LokiStore = require("connect-loki")(session);

module.exports = {
  login: (req, res) => {
    console.log("Login request");
    const form = req.body;
    const username = form.username2;
    const password = form.password2;
    const users = db.getCollection("users");
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
      }
      res.send(boolean);
    });
  },
  authenticatedAs: (req, res) => {
    const username = LokiStore.authenticatedAs;
    (username === undefined) ? res.send("-") : res.send(username);
  },
  logout: (req, res) => {
    if (LokiStore.authenticatedAs) {
      delete LokiStore.authenticatedAs;
      res.status("200").send("Logout complete");
    } else {
      res.status("500").send("Logout failed");
    }
  }
}
