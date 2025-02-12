const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const profileRouter = require("./profile");
const requestRouter = require("./request");
const userRouter = require("./user");

router.use("/profile", profileRouter);
router.use("/request", requestRouter);
router.use("/user", userRouter);
router.use("/", authRouter);

module.exports = router;
