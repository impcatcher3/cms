const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.fetchAll);
router.get("/user/:id", userController.fetchOne);

// Delete a user
// app.delete("/user/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     console.log("Delete called for user: " + id);
//     const user = users.findObject({$loki:id});
//     console.log(user);
//     if (user) users.remove(user);
//     console.log("User deleted");
//     (user) ? res.send("Deleted a user") : res.status("404").send("No user found");
// });



module.exports = router;
