const mongoose = require("mongoose");
const express = require("express");
const app = express();
const formidableMiddleware = require("express-formidable");
app.use(formidableMiddleware());

mongoose.connect("mongodb://localhost/leboncoin-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.get("/", function(req, res) {
  res.send("Welcome to the leboncoin API.");
});

const userRoutes = require("./routes/user.js");
app.use(userRoutes);
const offerRoutes = require("./routes/offer.js");
app.use(offerRoutes);

//Toutes les méthodes HTTP (GET, POST, etc.) des pages non trouvées afficheront
//une erreur 404

app.all("*", function(req, res) {
  res.status(404).json({ error: "Not Found" });
});

app.listen(3000, () => {
  console.log("leboncoin API running");
});
