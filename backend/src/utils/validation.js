const validator = require("validator");

const isValidSignupForm = (req) => {
  const { firstName, lastName, age, gender, email, password } = req.body;
  if (!firstName) throw new Error("First Name is required");
  if (!lastName) throw new Error("Last Name is required");
  if (!age) throw new Error("Age is required");
  if (!gender) throw new Error("Gender is required");
  if (!["M", "F", "O"].includes(gender))
    throw new Error("Please enter valid gender");
  if (!validator.isEmail(email))
    throw new Error("Please enter a valid email address");
};

const isValidUpdateFields = (req) => {
  const ALLOWED_UPDATES = [
    "firstName",
    "lastName",
    "about",
    "skills",
    "photoUrl",
  ];
  const isValid = Object.keys(req.body).every((key) =>
    ALLOWED_UPDATES.includes(key)
  );
  return isValid;
};

const isValidRequestStatus = (status) => {
  const ALLOWED_STATUS = ["ignored", "interested"];
  return ALLOWED_STATUS.includes(status);
};

const isValidReviewStatus = (status) => {
  const ALLOWED_STATUS = ["accepted", "rejected"];
  return ALLOWED_STATUS.includes(status);
};

module.exports = {
  isValidSignupForm,
  isValidUpdateFields,
  isValidRequestStatus,
  isValidReviewStatus,
};
