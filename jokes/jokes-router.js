const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const Jokes = require("../jokes/jokes-model.js");
const auth = require("../auth/authenticate-middleware.js");

router.post("/create/:id", auth, (req, res) => {
  let joke = req.body;

  Jokes.add(joke)
    .then(createdJoke => {
      joke.user_id = req.params.id;
      res.status(201).json(createdJoke);
    })
    .catch(error => {
      console.log("Error: " + error);
      res.status(500).json(error);
    });
});

module.exports = router;
