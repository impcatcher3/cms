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
const sess = require("./routes/session");
app.use(post);
app.use(user);
app.use(sess);

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    let sess = LokiStore;
    console.log("Session: " + sess);
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
