const express = require("express");
const router = express.Router();
const postController = require("../controllers/sessionController");

router.get("/session", sessionController.authenticatedAs);
router.post("/session", sessionController.login);
router.delete("/session", sessionController.logout);

module.exports = router;
