const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const {
  isValidRequestStatus,
  isValidReviewStatus,
} = require("../utils/validation");
const User = require("../models/user");
const route = express.Router();

route.post("/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    if (!isValidRequestStatus(status))
      return res.status(400).json({ message: "Invalid Status - " + status });

    const toUser = await User.findById(toUserId);
    if (!toUser) return res.status(404).json({ message: "Invalid User" });

    const isExistingConnection = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (isExistingConnection)
      return res.json({ message: "Connection request already exists" });

    const newConnectionRequest = new ConnectionRequest({
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

route.post("/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const userId = req.id;
    const status = req.params.status;

    if (!isValidReviewStatus(status))
      return res.status(400).json({ message: "Invalid Status - " + status });

    const isConnectionRequest = await ConnectionRequest.findOne({
      _id: req.params.requestId,
      toUserId: userId,
      status: "interested",
    });

    if (!isConnectionRequest)
      return res.status(404).json({ message: "Connection request not found" });

    isConnectionRequest.status = status;
    await isConnectionRequest.save();

    res.json({ message: "Connection request - " + status.toUpperCase() });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

module.exports = route;
