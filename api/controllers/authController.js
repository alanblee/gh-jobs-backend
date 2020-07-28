const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isValid = require("../../validations/authValidations");
const Users = require("./helpers/authHelper");

// POST - Register new user
module.exports.registerUser = async (req, res) => {
  let { username, pasword } = req.body;

  // validate the inputs
  if (!isValid.stringValidation(req.body)) {
    res.status(400).json({
      message: "Please provide username and password",
    });
  } else {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    //hash password
    const hash = bcrypt.hashSync(password, rounds);
    password = hash;
    try {
      const userInfo = {
        username,
        password,
      };
      const newUser = await Users.registerUser(userInfo);
      if (newUser.username) {
        res.status(201).json(newUser);
      } else {
        res.status(400).json({ message: newUser.message });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
