const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find
  //   findBy,
  //   findById
};

function find() {
  return db("jokes")
    .select("question", "answer", "user_id")
    .where("private", false);
}

// function findBy(filter) {
//   return db("users").where(filter);
// }

async function add(joke) {
  return await db("jokes")
    .insert(joke)
    .returning("*");
}

// function findById(id) {
//   return db("users").where({ id });
// }
