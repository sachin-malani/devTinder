const express = require("express");
const route = express.Router();
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const { isValidUpdateFields } = require("../utils/validation");
const bcrypt = require("bcrypt");

route.get("/", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.id, "-password -createdAt -updatedAt");

    if (!user) throw new Error("Invalid User");

    res.send(user);
  } catch (error) {
    res.send({ err: error.message });
  }
});

route.delete("/remove", userAuth, async (req, res) => {
  const id = req.id;
  try {
    const result = await User.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

route.patch("/update", userAuth, async (req, res) => {
  try {
    if (!isValidUpdateFields(req))
      return res.send({ err: "Invalid Input, update denied" });

    //No Validation
    // const user = await User.findOne(id);
    // Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    // user.save();

    const result = await User.findByIdAndUpdate(req.id, req.body, {
      runValidators: true,
      returnDocument: "after",
    }).select("firstName lastName age gender email skills about photoUrl");

    res.json({ message: "Updated Successfully", result });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

route.patch("/password", userAuth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.id, "password");
    if (!user) throw new Error("Invalid Token");

    const isValidPassword = await user.verifyPassword(oldPassword);
    if (!isValidPassword) throw new Error("Invalid credentials ");

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;
    user.save();

    res.json({ message: "Password Updated Successfully" });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

module.exports = route;
