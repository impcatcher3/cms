const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const LokiStore = require("connect-loki")(session);
const path = require("path");

const app = express();
const port = 3000;

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
app.use(post);
app.use(user);


app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    let sess = LokiStore;
    console.log("Session: " + sess);
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
