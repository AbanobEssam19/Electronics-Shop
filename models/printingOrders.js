const mongoose = require("mongoose");

const printingOrders = mongoose.model("printingOrders", {
  name: String,
  phone: String,
  grams: Number,
  color: String,
  quality: String,
  quantaty: String,
  buildTime: String,
  finishSurface: Boolean,
  technology: String,
  material: String,
  state:String,
});

module.exports = printingOrders;
