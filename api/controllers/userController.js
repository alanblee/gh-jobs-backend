const Users = require("./helpers/userHelper");
const isValid = require("../../validations/authValidations");
const bcrypt = require("bcryptjs");

//GET - gets the current user information
module.exports.getUser = async (req, res) => {
  const { username, id } = req.user;
  try {
    //make sure the user matches - another layer of route protection
    const foundUser = await Users.findById(Number(id));
    if (Number(id) === Number(foundUser.id)) {
      res.status(200).json({ username, id });
    } else {
      res.status(404).json({ msg: "Please log in" });
    }
  } catch (err) {
    res.status(500).json({ msg: "An error has occured", err: err.message });
  }
};

//PUT - Updates the user information
module.exports.updateUser = async (req, res) => {
  let { username, password } = req.body;
  const { id } = req.user;
  if (Number(id) !== Number(req.params.userId)) {
    res.status(401).json({ message: "Unauthorized, please login" });
  }
  try {
    //make sure the user matches - another layer of route protection
    const foundUser = await Users.findById(Number(id));
    if (Number(id) === Number(foundUser.id)) {
      //validate inputs
      if (!isValid.stringValidation(req.body)) {
        res.status(400).json({
          message: "Please provide username or password",
        });
      } else {
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        //hash password
        const hash = bcrypt.hashSync(password, rounds);
        password = hash;
        const updatedInfo = {
          username,
          password,
          id,
        };
        if (req.user.username === req.body.username) {
          const updatedUser = await Users.updateUser({
            password: updatedInfo.password,
            id,
          });
          if (updatedUser.username) {
            res.status(200).json(updatedUser);
          } else {
            res
              .status(400)
              .json({ message: "Could not update user information" });
          }
        } else if (req.user.username !== req.body.username) {
          const updatedUser = await Users.updateUser(updatedInfo);
          if (updatedInfo.username) {
            res.status(200).json(updatedUser);
          } else {
            res.status(400).json({ message: updatedUser.message });
          }
        }
      }
    } else {
      res.status(404).json({ msg: "Please log in" });
    }
  } catch (err) {
    res.status(500).json({ msg: "An error has occured", err: err.message });
  }
};
