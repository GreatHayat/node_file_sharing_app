const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const { User } = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid Credentials...");
  }
  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validatePassword) {
    return res.status(400).send("Invalid Credentials...");
  }
  const token = user.generateAuthToken();
  res.send(token);
});
function validateUser(user) {
  const schema = {
    email: Joi.string()
      .min(8)
      .max(255)
      .required()
      .email()
      .label("Email")
  };
  return Joi.validate(user, schema);
}
module.exports = router;
