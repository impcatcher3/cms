module.exports = {
  fetchAll: () => {
    return db.getCollection("posts");
  }
}
