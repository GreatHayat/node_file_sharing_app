const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const users = require("./routes/users");
const auth = require("./routes/auth");
const files = require("./routes/files");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/files", files);
mongoose
  .connect("mongodb://localhost/file_sharing_app")
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.log("Couldn't connected to MongoDB", error));
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`App is listining on port ${port}`));
