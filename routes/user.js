const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.fetchAll);
router.get("/user/:id", userController.fetchOne);
// router.post("/user", userController.create);
router.delete("/user/:id", userController.delete);

module.exports = router;
