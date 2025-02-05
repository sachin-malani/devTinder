const express = require("express");
const { userAuth } = require("../middleware/auth");
const connectionRequest = require("../models/connectionRequest");
const { isValidStatus } = require("../utils/validation");
const User = require("../models/user");
const route = express.Router();

route.post("/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    if (!isValidStatus(status))
      return res.status(400).json({ message: "Invalid Status - " + status });

    const toUser = await User.findById(toUserId);
    if (!toUser) return res.status(404).json({ message: "Invalid User" });

    const isExistingConnection = await connectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (isExistingConnection)
      return res.json({ message: "Connection request already exists" });

    const newConnectionRequest = new connectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    await newConnectionRequest.save();
    res.json({ message: `Connection Request sent to ${toUser.firstName}` });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

module.exports = route;
