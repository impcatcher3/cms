const express = require("express");
const router = express.Router();
const postController = require("../controllers/sessionController");

router.get("/posts", postController.fetchAll);
router.get("/post/:id", postController.fetchOne);
router.post("/post", postController.create);
router.delete("/post/:id", postController.delete)

router.get("/session", sessionController.authenticatedAs);
router.post("/session", sessionController.login);
router.delete("/session", sessionController.logout);

module.exports = router;
