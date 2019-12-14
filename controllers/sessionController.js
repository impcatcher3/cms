const db = require("../db").db;
const bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports = {
  login: (req, res) => {
    const username = req.body.username2;
    const password = req.body.password2;
    const users = db.getCollection("users");
    const user = users.findObject({"username":username});

    if (!user) {
      res.status("404").send("404: Username not found");
      return;
    }
    const hash = user.password;
    bcrypt.compare(password, hash, (err, success) => {
      if (success) {
        req.session.authenticatedAs = username;
        res.status("200").send("200: " + req.session.authenticatedAs);
        return;
      }
      res.status("403").send("403: Password incorrect");
    });
  },
  authenticatedAs: (req, res) => {
    const username = req.session.authenticatedAs;
    (username === undefined) ? res.send("nobody") : res.send(username);
  },
  logout: (req, res) => {
    if (req.session.authenticatedAs) {
      delete req.session.authenticatedAs;
      res.status("200").send("200: Logout successful");
    } else {
      res.status("400").send("400: Logout unsuccessful");
    }
  }
}
