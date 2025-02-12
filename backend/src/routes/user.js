const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const route = express.Router();

const SELECT_FIELDS = "firstName lastName age gender about photoUrl skills";

route.get("/received", userAuth, async (req, res) => {
  try {
    const id = req.id;

    const data = await ConnectionRequest.find({
      toUserId: id,
      status: "interested",
    })
      .select("fromUserId")
      .populate("fromUserId", SELECT_FIELDS);

    // const result = data.map((item) => ({
    //   requestId: item._id,
    //   userId: item.fromUserId._id,
    //   firstName: item.fromUserId.firstName,
    //   lastName: item.fromUserId.lastName,
    // }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

route.get("/connections", userAuth, async (req, res) => {
  try {
    const id = req.id;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: id, status: "accepted" },
        { fromUserId: id, status: "accepted" },
      ],
    })
      .select("_id")
      .populate("fromUserId", SELECT_FIELDS)
      .populate("toUserId", SELECT_FIELDS);

    const result = connectionRequest.map((item) => {
      if (item.fromUserId._id.toString() === id.toString())
        return item.toUserId;
      return item.fromUserId;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

route.get("/feed", userAuth, async (req, res) => {
  try {
    const id = req.id;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 30 ? 30 : limit;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: id }, { toUserId: id }],
    }).select("fromUserId toUserId -_id");

    let hideProfile = new Set();
    connectionRequest.forEach((request) => {
      hideProfile.add(request.fromUserId.toString());
      hideProfile.add(request.toUserId.toString());
    });

    const result = await User.find({
      $and: [{ _id: { $nin: Array.from(hideProfile) } }, { _id: { $ne: id } }],
    })
      .select(SELECT_FIELDS)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(result);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

module.exports = route;
