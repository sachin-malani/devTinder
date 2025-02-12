const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
};

module.exports = {
  connect,
};
