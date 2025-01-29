const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 1, maxLength: 30 },
    lastName: { type: String, minLength: 1, maxLength: 30 },
    age: { type: Number, required: true, min: 14 },
    gender: {
      type: String,
      enum: {
        values: ["M", "F", "O"],
        message: "{VALUE} is not supported",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Please enter a valid email address",
      },
    },
    password: { type: String, required: true },
    skills: {
      type: [String],
      validate: {
        validator: function (skills) {
          return skills.length <= 10;
        },
        message: "User can add upto 10 skills",
      },
    },
    photoUrl: {
      type: String,
      default: "https://img.icons8.com/fluency-systems-regular/50/user--v1.png",
      validate: {
        validator: function (value) {
          return validator.isURL(value);
        },
        message: "Please Enter a valid URL",
      },
    },
    about: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
