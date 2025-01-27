const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hi There");
});

app.listen(3000, () => {
  console.log("Server up and running 🚀🚀");
});
