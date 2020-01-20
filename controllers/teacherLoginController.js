const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const TeacherAuth = mongoose.model("TeacherAuth");

router.get("/", (req, res) => {
  res.render("teacherLogin/login", {
    viewTitle: "Login As Faculty"
  });
});

router.post("/", (req, res) => {
  // console.log(req.body);
  TeacherAuth.find(
    { teacherLoginID: req.body.uname, teacherPassword: req.body.password },
    (err, docs) => {
      if (docs.length !== 0) {
        // console.log(docs);
        // console.log("successsss");
        // res.render("teacherAuth/addOrEdit");
        res.render("facultyHome/addOrEdit", {
          viewTitle: "Login As Faculty"
        });
        // , {
        //     list: docs
        // });
      } else {
        res.render("teacherLogin/regMissing");
        // console.log("Failed");
      }
    }
  );
});

// db.teacherAuth.find({"studentId": req.body.uname, "studentPassword": req.body.Password}); , "studentPassword": req.body.Password

module.exports = router;
