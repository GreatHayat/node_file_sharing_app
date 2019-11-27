const mongoose = require("mongoose");

const fileUploadingSchema = new mongoose.Schema({
  file_path: {
    type: String,
    required: true
  },
  originalname: {
    type: String
  },
  filename: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  tag_user: {
    type: String
  },
  upload_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  expire_date: {
    type: Date
  }
});

const FileUploading = mongoose.model("FileUploading", fileUploadingSchema);

exports.FileUploading = FileUploading;
