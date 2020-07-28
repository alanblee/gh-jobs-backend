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

//POST - Login user
module.exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!isValid.stringValidation(req.body)) {
    res.status(400).json({
      message: "Please provide username, password",
    });
  } else {
    //find user by username
    const [user] = await Users.findBy({ username });
    try {
      if (user && bcrypt.compareSync(password, user.password)) {
        //create jwt payload
        const payload = {
          sub: user.id,
          username: user.username,
          id: user.id,
        };
        //jwt options
        const options = {
          expiresIn: "7d",
        };
        //get the jwt secret from env
        const jwtSecret = process.env.JWT_SECRET;
        //jwt sign token
        jwt.sign(payload, jwtSecret, options, (err, token) => {
          if (err) {
            return res.status(400).json({ msg: err });
          }
          res.status(200).json({
            success: true,
            token,
            id: user.id,
            username: user.username,
          });
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
