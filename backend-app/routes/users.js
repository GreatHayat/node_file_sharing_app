const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User Already Registered With that Email...");
  }

  user = new User(
    _.pick(req.body, ["username", "email", "password", "isAdmin"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["username", "email", "isAdmin"]));
});
router.get("/", async (req, res) => {
  const users = await User.find().select({ username: 1 });
  res.send(users);
});
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).send("User With That ID Doesn't Exists...");
  }
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove({ _id: req.params.id });
  if (!user) {
    return res.status(404).send("User With That ID Doesn't Exists...");
  }
  res.send(user);
});
module.exports = router;
