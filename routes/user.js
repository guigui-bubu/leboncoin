const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

router.post("/user/sign_up", async (req, res) => {
  // je regarde l'utilisateur a déjà un compte en verifiant son adresse mail
  const user = await User.findOne({ email: req.fields.email });
  if (user) {
    res.json({ message: "This email already has an account." });
  } else {
    if (req.fields.email && req.fields.password && req.fields.username) {
      // sinon inscription de l'utilisateur en demandant email, username et passeword
      const token = uid2(64);
      const salt = uid2(64);
      const hash = SHA256(req.fields.password + salt).toString(encBase64);
      const user = new User({
        email: req.fields.email,
        token: token,
        salt: salt,
        hash: hash,
        account: {
          username: req.fields.username,
          phone: req.fields.phone
        }
      });

      await user.save();

      res.json({
        _id: user._id,
        token: user.token,
        account: user.account
      });
    } else {
      res.json({ error: "Missing parameter(s)" });
    }
  }
});

router.post("/user/log_in", async (req, res, next) => {
  const user = await User.findOne({ email: req.fields.email });
  // on regarde si l'utilisateur à bien un mail dans la BDD
  if (user) {
    if (
      // on reagrde si le password est bien égal au hash de la BDD
      SHA256(req.fields.password + user.salt).toString(encBase64) === user.hash
    ) {
      res.json({
        _id: user._id,
        token: user.token,
        account: user.account
      });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    res.json({ message: "User not found" });
  }
});

module.exports = router;
