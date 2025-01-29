const validator = require("validator");

const isValidSignupForm = (req) => {
  const { firstName, lastName, age, gender, email, password } = req.body;
  if (!firstName) throw new Error("First Name is required");
  if (!validator.isEmail(email))
    throw new Error("Please enter a valid email address");
  if (!["M", "F", "O"].includes(gender))
    throw new Error("Please enter valid gender");
};

module.exports = {
  isValidSignupForm,
};