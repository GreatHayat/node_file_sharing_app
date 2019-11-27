const _ = require("lodash");
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { FileUploading } = require("../models/file");
const { User } = require("../models/user");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function(req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });
router.post("/", upload.single("file"), async (req, res) => {
  if (req.files === null) {
    return res.status(400).send("No File Choose...");
  }
  var today = new Date();
  var newdate = new Date();
  newdate.setDate(today.getDate() + 3);
  const user = await User.findOne({ email: req.body.tag_user });
  if (user) {
    fileUploading = new FileUploading({
      file_path: req.file.path,
      originalname: req.file.originalname,
      filename: req.file.filename,
      tag_user: user.username,
      expire_date: newdate,
      user: new User({ _id: req.body.user_id })
    });
    await fileUploading.save();
    res.send(fileUploading);
  }
  if (!user) {
    return res
      .status(400)
      .send("You are tagging a user which is not exist in our system!");
  }
});

router.get("/", async (req, res) => {
  const files = await FileUploading.find()
    .populate("user", "username -_id")
    .select("originalname filename file_path tag_user upload_date expire_date");
  res.send(files);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).send("File Not Found");
  }
  await FileUploading.findById(req.params.id)
    .select("originalname filename")
    .then(file => res.send(file))
    .catch(error => res.status(404).send("File Not Found"));

  //res.send(file);
});
router.post("/file_name", (req, res) => {
  const filepath = path.join(__dirname, "../uploads" + "/" + req.body.filename);
  fs.unlink(filepath, function(err) {
    if (err) throw err;
    res.send("File deleted!");
  });
});
router.post("/download", (req, res) => {
  const filepath = path.join(__dirname, "../uploads" + "/" + req.body.filename);
  res.sendFile(filepath);
  setTimeout(async function() {
    await FileUploading.findOneAndDelete(req.body.fileId);
    fs.unlink(filepath, function(err) {
      if (err) throw err;
      console.log("File deleted!");
    });
  }, 5000);
});
module.exports = router;
