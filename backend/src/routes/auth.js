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
    if (!validator.isEmail(email)) return res.status(400).json({message: "Invalid email"});

    const user = await User.findOne({ email: email });

    if (!user) return res.status(400).json({message: "Invalid Credentials"});

    const result = await user.verifyPassword(password);
    if (!result) return res.status(400).json({message: "Invalid Credentials"});

    const token = await user.getJWT();

    res.cookie("token", token);
    res.json(user);
  } catch (error) {
    res.json({ message: error.message });
  }
});

route.post("/logout", (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .send({ message: "Logout Successfull" });
});

module.exports = route;
