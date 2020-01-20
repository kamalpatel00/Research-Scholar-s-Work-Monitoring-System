const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const StudentSupervisior = mongoose.model("StudentSupervisior");

router.get("/", (req, res) => {
  res.render("studentHome/addOrEdit", {
    viewTitle: ""
  });
});

router.post("/", (req, res) => {
  // console.log(req.body);
  StudentSupervisior.findOne(
    { studentReg: req.body.studentSearch },
    (err, docs) => {
      if (!err) {
        res.render("studentSupervisior/list2", {
          list: docs
        });
      } else {
        console.log("Error in retriving Supervisior Detail :" + err);
      }
    }
  );
});

module.exports = router;
