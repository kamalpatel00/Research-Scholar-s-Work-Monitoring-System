const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const AdminAuth = mongoose.model("AdminAuth");

router.get("/", (req, res) => {
  res.render("adminLogin/login", {
    viewTitle: "Login As Admin"
  });
});

router.post("/", (req, res) => {
  // console.log(req.body);
  AdminAuth.find(
    { loginId: req.body.uname, password: req.body.password },
    (err, docs) => {
      if (docs.length !== 0) {
        // console.log(docs);
        // console.log("successsss");
        // res.render("teacherAuth/addOrEdit");
        res.render("adminHome/addOrEdit", {
          viewTitle: "Login As Adminn"
        });
        // , {
        //     list: docs
        // });
      } else {
        res.render("adminLogin/regMissing");
        // console.log("Failed");
      }
    }
  );
});

// db.teacherAuth.find({"studentId": req.body.uname, "studentPassword": req.body.Password}); , "studentPassword": req.body.Password

module.exports = router;
