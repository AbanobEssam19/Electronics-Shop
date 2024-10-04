const mongoose = require("mongoose");

const Orders = mongoose.model("Orders", {
  name: String,
  phone: String,
  grams: Number,
  color: String,
  quality: String,
  filePath: String,
});

module.exports = Orders;
