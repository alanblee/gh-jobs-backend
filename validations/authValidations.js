const stringValidation = ({ username, password }) => {
  return Boolean(
    username &&
      password &&
      typeof password === "string" &&
      typeof username === "string"
  );
};

module.exports = {
  stringValidation,
};
