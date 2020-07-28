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
