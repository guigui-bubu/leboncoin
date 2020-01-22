const express = require("express");
const router = express.Router;
const Offer = require("../models/Offer.js");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/offer/publish", isAuthenticated, async (req, res) => {
  try {
    const obj = {
      title: req.fields.title,
      description: req.fields.description,
      price: req.fields.price,
      creator: req.user
    };
    const offer = new Offer(obj);
    await offer.save();
    res.json({
      _id: offer._id,
      title: offer.title,
      description: offer.description,
      price: offer.price,
      created: offer.created,
      creator: {
        account: offer.creator.account,
        _id: offer.creator._id
      }
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
