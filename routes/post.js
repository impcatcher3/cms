  const express = require("express");
  const router = express.Router();
  const postController = require("../controllers/postController");

  router.get("/posts", postController.fetchAll);
  router.get("/post/:id", postController.fetchOne);
  router.post("/post", postController.create);
  router.delete("/post/:id", postController.delete)

  // Post a post!
  // app.post("/post", (req, res) => {
  //   if (!LokiStore.authenticatedAs) {
  //     res.status(403).send("No user authentication");
  //     return;
  //   }
  //   const post = req.body;
  //   console.log(post);
  //   posts.insert({
  //     username: LokiStore.authenticatedAs,
  //     content: post.content
  //   });
  //   res.send("Added a post");
  // });
  //
  //
  // // Delete a post
  // app.delete("/post/:id", (req, res) => {
  //     const id = parseInt(req.params.id);
  //     console.log("Delete called for: " + id);
  //     const post = posts.findObject({$loki:id});
  //     console.log(post);
  //     if (post) posts.remove(post);
  //     console.log("Entry deleted");
  //     (post) ? res.send("Deleted a post") : res.status("404").send("No post found");
  // });

module.exports = router;
