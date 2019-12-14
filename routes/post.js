  const express = require("express");
  const router = express.Router();
  const postController = require("../controllers/postController");

  router.get("/posts", postController.fetchAll);
  router.get("/post/:id", postController.fetchOne);
  router.post("/post", postController.create);
  router.delete("/post/:id", postController.delete);
  router.put("/post/:id", postController.edit);

module.exports = router;
