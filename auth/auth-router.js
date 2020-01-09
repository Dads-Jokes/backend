const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  console.log("Adding...: " + user);

  Users.add(user)
    .then(saved => {
      console.log("Saved: " + saved);
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log("Error: " + error);
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token: token,
          user_id: user.id
        });
      } else {
        res.status(401).json({ message: "You Shall Not Pass!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;

function genToken(user) {
  const payload = {
    userid: user.id,
    username: user.username,
    department: user.department
  };

  const options = {
    expiresIn: "8h"
  };
  const token = jwt.sign(payload, secrets.jwtSecret, options);
  return token;
}
