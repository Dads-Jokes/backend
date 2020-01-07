const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const Jokes = require("../jokes/jokes-model.js");
const auth = require("../auth/authenticate-middleware.js");

router.post("/create", auth, (req, res) => {
  let joke = req.body;
  Jokes.add({ joke })
    .then(createdJoke => {
      res.status(201).json(createdJoke);
    })
    .catch(error => {
      console.log("Error: " + error);
      res.status(500).json(error);
    });
});

module.exports = router;
