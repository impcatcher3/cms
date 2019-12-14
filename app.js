const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const LokiStore = require("connect-loki")(session);
const path = require("path");
const bcrypt = require("bcryptjs");

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(session({
    store: new LokiStore({
		  logErrors: true,
		  ttl: 10
		}),
    secret: "keyboard cat",
		resave: false, // check
		saveUninitialized: true // check
}));

// Routes - is this the right way?
const post = require("./routes/post");
const user = require("./routes/user");
app.use("/", post);
app.use("/", user);


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));



app.get("/", function(req, res) {
    let sess = LokiStore;
    console.log("Session: " + sess);
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

app.listen(port, () => console.log(`App listening on port ${port}!`));
