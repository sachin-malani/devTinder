const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const validator = require("validator");
const { isValidSignupForm } = require("../utils/validation");
const User = require("../models/user");

route.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      gender,
      email,
      password,
      skills,
      photoUrl,
      about,
    } = req.body;

    isValidSignupForm(req);

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      age,
      gender,
      email,
      password: hashPassword,
      skills,
      photoUrl,
      about,
    });

    const result = await user.save();
    res.send(result);
  } catch (error) {
    res.send({ err: error.message });
  }
});

route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) throw new Error("Invalid email");

    const user = await User.findOne({ email: email }, "password");

    if (!user) throw new Error("Invalid Credentials");

    const result = await user.verifyPassword(password);
    if (!result) throw new Error("Invalid Credentials");

    const token = await user.getJWT();

    res.cookie("token", token);
    res.send({ message: "Login Successfull" });
  } catch (error) {
    res.send({ err: error.message });
  }
});

module.exports = route;
