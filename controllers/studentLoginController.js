const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const StudentAuth = mongoose.model("StudentAuth");

router.get("/", (req, res) => {
  res.render("studentLogin/Login", {
    viewTitle: "Login As Student"
  });
});

router.post("/", (req, res) => {
  // console.log(req.body);
  StudentAuth.find(
    { studentId: req.body.uname, studentPassword: req.body.password },
    (err, docs) => {
      if (docs.length !== 0) {
        // console.log(docs);
        // console.log("successsss");
        res.render("studentReport/addOrEdit");
        // , {
        //     list: docs
        // });
      } else {
        res.render("studentLogin/Login");
        // console.log("Failed");
      }
    }
  );
});

// db.StudentAuth.find({"studentId": req.body.uname, "studentPassword": req.body.Password}); , "studentPassword": req.body.Password

module.exports = router;
