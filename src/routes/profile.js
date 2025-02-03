const express = require("express");
const route = express.Router();
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");

route.get("/", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.id);

    if (!user) throw new Error("Invalid User");

    res.send(user);
  } catch (error) {
    res.send({ err: error.message });
  }
});

route.get("/user", userAuth, async (req, res) => {
  const body = req.body;
  try {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send({ err: error });
  }
});

route.delete("/user", userAuth, async (req, res) => {
  const id = req.body.userId;
  try {
    const result = await User.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

route.patch("/user", userAuth, async (req, res) => {
  const id = req.body.userId;
  try {
    const ALLOWED_UPDATES = ["userId", "skills", "about", "photoUrl"];
    const isUpdateAllowed = Object.keys(req.body).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed)
      return res.send({ err: "Invalid Input, update denied" });

    const result = await User.findByIdAndUpdate(id, req.body, {
      runValidators: true,
    });
    res.send(result);
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

module.exports = route;
