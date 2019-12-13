const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const loki = require("lokijs");
const LokiStore = require("connect-loki")(session);
const path = require("path");
const bcrypt = require("bcryptjs");

const app = express();
const port = 3000;
const db = new loki("cms.db", {
	autoload: true,
	autoloadCallback : databaseInitialize,
	autosave: true,
	autosaveInterval: 4000
});

const saltRounds = 10;
const options = {
  logErrors: true,
  ttl: 10
}

app.use(session({
    store: new LokiStore(options),
    secret: "keyboard cat"
}));

// Routes
require("./routes/post")(app);//
// require("./routes/user"); // (app) necessary?

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

function databaseInitialize() {
  let users = db.getCollection("users");
  if (users === null) {
    users = db.addCollection("users");
  }
  let posts = db.getCollection("posts");
  if (posts === null) {
    posts = db.addCollection("posts");
  }
  let stats = db.getCollection("stats");
  if (stats === null) {
    stats = db.addCollection("stats");
  }
  showStats();
}


function showStats() {
  const users = db.getCollection("users");
  const posts = db.getCollection("posts");
  const count1 = (users) ? db.getCollection("users").count() : 0;
  const count2 = (posts) ? db.getCollection("posts").count() : 0;
  console.log("Number of users in database: " + count1);
  console.log("Number of posts: " + count2);
}

app.get("/", function(req, res) {
    let sess = LokiStore;
    console.log(sess);
    res.sendFile(path.join(__dirname + "/public/index.html"));
});



app.post("/register", (req, res) => {
  const user = req.body;
  bcrypt.hash(user.password, saltRounds, function(err, hash) {
    user.password = hash;
    users.insert({
      username:user.username,
      password:user.password
    });
    res.send("Added a user");
  });
})

app.post("/login", (req, res) => {
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
});

app.get("/login", (req, res) => {
  let username = LokiStore.authenticatedAs;
  (username === undefined) ? res.send("-") : res.send(username);
});

app.post("/logout", (req, res) => {
  if (LokiStore.authenticatedAs) {
    delete LokiStore.authenticatedAs;
    res.status("200").send("Logout complete");
  } else {
    res.status("500").send("Logout failed");
  }
});

app.get("/terminate", (req, res) => {
  process.exit(22);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
