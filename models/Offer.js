const mongoose = require("mongoose");

const Offer = mongoose.model("Offer", {
  title: { type: String, min: 5, max: 100, require: true },
  description: { type: String, min: 0, max: 1000 },
  price: { type: Number, require: true },
  datecreated: { type: Date, default: Date.now },
  creator: { type: mongoose.Schema.Types.ObjectId, username: "user" }
});

module.exports = Offer;
