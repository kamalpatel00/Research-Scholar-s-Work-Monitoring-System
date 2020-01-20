const express = require("express");
var router = express.Router();
// const mongoose = require("mongoose");
// var app = express();
var multer = require("multer");
var mkdirp = require("mkdirp");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    var path = __dirname + "/uploads/";
    mkdirp(path, function(err) {
      if (err) throw err;
      cb(null, path);
      console.log("here");
    });
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
}).single("file");

router.get("/", (req, res) => {
  res.render("studentReport/addOrEdit");
});

router.post("/", async function(req, res) {
  // console.log("Server file");
  let rFile = req.body;
  console.log(rFile);
  await upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(201).json();
  });
});

// router.post("/", (req, res) => {
//   res.json(req.body);
// });
module.exports = router;
