module.exports = (app) => {

  express = require('express'); // are these two lines necessary?
  var router = express.Router();

  const postController = require("../controllers/postController");

  // Get all posts
  // app.get("/posts", (req, res) => {
  //     (posts) ? res.json(posts.data) : res.status(404).send("Posts not found");
  // });
  router.get("/posts", postController.fetchAll);

  // Get specific post (for editing)
  app.get("/post/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const post = posts.findObject({$loki:id});
      (post) ? res.json(post) : res.status(404).send("Post not found");
  });

  // Post a post!
  app.post("/post", (req, res) => {
    if (!LokiStore.authenticatedAs) {
      res.status(403).send("No user authentication");
      return;
    }
    const post = req.body;
    console.log(post);
    posts.insert({
      username: LokiStore.authenticatedAs,
      content: post.content
    });
    res.send("Added a post");
  });

  // Edit a post - currently broken
  app.post("/post/:id", (req, res) => { // change with new loki
      const id = parseInt(req.params.id);
      console.log("Request to edit $loki: " + id);

      const oldPost = posts.findObject({$loki:id});
      const newPost = req.body;

      oldPost.post = newPost;
      posts.update(oldPost);

      res.send("Edited a post");
  });

  // Delete a post
  app.delete("/post/:id", (req, res) => {
      const id = parseInt(req.params.id);
      console.log("Delete called for: " + id);
      const post = posts.findObject({$loki:id});
      console.log(post);
      if (post) posts.remove(post);
      console.log("Entry deleted");
      (post) ? res.send("Deleted a post") : res.status("404").send("No post found");
  });

  module.exports = router; // is this necessary?
}
