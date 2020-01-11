const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findByUser,
  editJoke,
  deleteJoke
  //   findBy,
  //   findById
};

function find() {
  return db("jokes")
    .select("id", "question", "answer", "user_id")
    .where("private", false);
}

function findByUser(userID) {
  return db("jokes")
    .select("id", "question", "answer", "user_id")
    .where("user_id", userID);
}

async function add(joke) {
  return await db("jokes")
    .insert(joke)
    .returning("*");
}

async function editJoke(jokeID, jokeChanges) {
  return await db("jokes")
    .where("id", jokeID)
    .update(jokeChanges);
}

async function deleteJoke(jokeID) {
  return await db("jokes")
    .where("id", jokeID)
    .del();
}

// function findById(id) {
//   return db("users").where({ id });
// }
