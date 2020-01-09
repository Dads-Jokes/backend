const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const Jokes = require("../jokes/jokes-model.js");
const auth = require("../auth/authenticate-middleware.js");

router.post("/create/:id", auth, (req, res) => {
  let joke = req.body;
  joke.user_id = req.params.id;

  Jokes.add(joke)
    .then(createdJoke => {
      res.status(201).json(createdJoke);
    })
    .catch(error => {
      console.log("Error: " + error);
      res.status(500).json(error);
    });
});

router.get("/", (req, res) => {
  Jokes.find()
    .then(jokes => {
      res.status(201).json(jokes);
    })
    .catch(error => {
      console.log("Error: " + error);
      res.status(500).json(error);
    });
});

router.get("/byuser/:id", auth, (req, res) => {
  let userID = req.params.id;
  Jokes.findByUser(userID)
    .then(jokes => {
      res.status(201).json(jokes);
    })
    .catch(error => {
      console.log("Error: " + error);
      res.status(500).json(error);
    });
});

router.delete("/delete/:id", auth, (req, res) => {
  let jokeID = req.params.id;

  Jokes.deleteJoke(jokeID)
    .then(joke => {
      console.log(joke);
      if (joke) {
        res.status(201).json({ deleted: "joke deleted" });
      } else {
        res.status(404).json({ message: "invalid joke id" });
      }
    })
    .catch(error => {
      console.log("Error: " + error);
      res.status(500).json(error);
    });
});

module.exports = router;
