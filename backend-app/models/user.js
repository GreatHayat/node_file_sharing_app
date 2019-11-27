const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true,
    unique: true
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 255,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: false
  }
});
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin, username: this.username },
    "jwtPrivateKey"
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    username: Joi.string()
      .min(5)
      .max(30)
      .required()
      .label("Username"),
    email: Joi.string()
      .min(8)
      .max(255)
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .min(8)
      .max(255)
      .required()
      .label("Password"),
    isAdmin: Joi.boolean()
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
