const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

router.get("/", (req, res) => {
  res.render("studentFilter/addOrEdit", {
    viewTitle: "SEARCH STUDENT BY"
  });
});

router.post("/", (req, res) => {
  // console.log(req.body);
  Student.find({ studentCategory: req.body.stdType }, (err, docs) => {
    if (!err) {
      res.render("student/list", {
        list: docs
      });
    } else {
      console.log("Error in retriving Supervisior Detail :" + err);
    }
  });
});

module.exports = router;
