module.exports = {
  fetchAll: () => {
    console.log(db.getCollection("posts"));
    return db.getCollection("posts");
  }
}
