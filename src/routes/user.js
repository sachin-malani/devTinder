const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
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

module.exports = route;
