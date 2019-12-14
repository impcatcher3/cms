const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

const session = require("express-session");
const LokiStore = require("connect-loki")(session);

// Force save on Ctrl + C
const db = require("./db").db;
process.on('SIGINT', function() {
  console.log("flushing database");
  db.close();
});

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
const sess = require("./routes/session");
const user = require("./routes/user");
const post = require("./routes/post");
app.use(sess);
app.use(user);
app.use(post);

app.use(cors());
app.use(express.static(__dirname + "/public"));

app.listen(port, () => console.log(`App listening on port ${port}!`));
