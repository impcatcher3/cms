module.exports = (app) => {

  // Get all users
  app.get("/users", (req, res) => {
    (users) ? res.json(users.data) : res.status(404).send("Users not found");
  });

  // Delete a user
  app.delete("/user/:id", (req, res) => {
      const id = parseInt(req.params.id);
      console.log("Delete called for user: " + id);
      const user = users.findObject({$loki:id});
      console.log(user);
      if (user) users.remove(user);
      console.log("User deleted");
      (user) ? res.send("Deleted a user") : res.status("404").send("No user found");
  });
}
