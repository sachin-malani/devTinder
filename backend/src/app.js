const express = require("express");
const cookieparser = require("cookie-parser");
const { connect } = require("./db/database");
const app = express();
const cors = require("cors");
const router = require("./routes/index");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());

app.get("/", (req, res) => {
  res.send("Hi There");
});

app.use("/", router);

app.use((err, req, res, next) => {
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
