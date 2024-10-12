const mongoose = require("mongoose");
const users = require("./models/users");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("db connected");
  })
  .catch(() => {
    console.log("faild to connect");
  });

module.exports = mongoose;
