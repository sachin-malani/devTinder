const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { connect } = require("./db/database");
const User = require("./models/user");
const { isValidSignupForm } = require("./utils/validation");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi There");
});

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) throw new Error("Invalid email");

    const user = await User.findOne({ email: email }, "password");

    if (!user) throw new Error("Invalid Credentials");

    const result = await bcrypt.compare(password, user.password);
    if (!result) throw new Error("Invalid Credentials");

    res.send({ message: "Login Successfull" });
  } catch (error) {
    res.send({ err: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message });
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
