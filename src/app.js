const express = require("express");
const { connect } = require("./db/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi There");
});

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    const result = await user.save();
    res.send(result);
  } catch (error) {
    res.send({ err: error });
  }
});

connect()
  .then(() => {
    console.log("Database Connected Successfully 🚀🚀🚀");
    app.listen(3000, () => {
      console.log("Server up and running 🚀🚀");
    });
  })
  .catch((err) => {
    console.error("Error while connecting to database : ", err);
  });
