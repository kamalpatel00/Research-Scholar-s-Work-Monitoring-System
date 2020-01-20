const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const StudentSupervisior = mongoose.model("StudentSupervisior");
const Student = mongoose.model("Student");
const Teacher = mongoose.model("Teacher");

router.get("/", (req, res) => {
  Student.find((err, docs) => {
    if (!err) {
      Teacher.find((err, docs1) => {
        if (!err) {
          res.render("studentSupervisior/addOrEdit", {
            viewTitle: "Assign SuperVisior",
            list: docs,
            list1: docs1
          });
        } else {
          console.log("Error in Retriving Teacher list :" + err);
        }
      });
    } else {
      console.log("Error in Retriving Teacher list :" + err);
    }
  });
});

router.get("/", (req, res) => {
  res.render("studentSupervisior/addOrEdit", {
    viewTitle: "Assign Supervisior"
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  var studentSupervisior = new StudentSupervisior();
  studentSupervisior.studentReg = req.body.studentReg;
  studentSupervisior.sv1 = req.body.sv1;
  studentSupervisior.sv2 = req.body.sv2;
  studentSupervisior.sv3 = req.body.sv3;
  studentSupervisior.sv4 = req.body.sv4;
  studentSupervisior.sv5 = req.body.sv5;
  studentSupervisior.sv6 = req.body.sv6;
  studentSupervisior.sv7 = req.body.sv7;
  studentSupervisior.sv8 = req.body.sv8;
  studentSupervisior.save((err, doc) => {
    if (!err) {
      res.redirect("studentSupervisior/list");
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("studentSupervisior/addOrEdit", {
          viewTitle: "Assign Supervisior",
          studentSupervisior: req.body
        });
      } else Console.log("Error During School Department insertion:" + err);
    }
  });
}

//Update School & Department Record
function updateRecord(req, res) {
  StudentSupervisior.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("studentSupervisior/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("studentSupervisior/addOrEdit", {
            viewTitle: "Assign SuperVisior",
            studentSupervisior: req.body
          });
        } else console.log("Error during records update:" + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  StudentSupervisior.find((err, docs) => {
    if (!err) {
      res.render("studentSupervisior/list", {
        list: docs
      });
    } else {
      console.log("Error in retriving Supervisior list:" + err);
    }
  });
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "studentReg":
        body["studentRegError"] = err.errors[field].message;
        break;
      case "sv1":
        body["sv1Error"] = err.errors[field].message;
        break;
      case "sv2":
        body["sv2Error"] = err.errors[field].message;
        break;
      case "sv3":
        body["sv3Error"] = err.errors[field].message;
        break;
      case "sv4":
        body["sv4Error"] = err.errors[field].message;
        break;
      case "sv5":
        body["sv5Error"] = err.errors[field].message;
        break;
      case "sv6":
        body["sv6Error"] = err.errors[field].message;
        break;
      case "sv7":
        body["sv7Error"] = err.errors[field].message;
        break;

      case "sv8":
        body["sv8Error"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

//Show the Record in form page

router.get("/:id", (req, res) => {
  StudentSupervisior.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("studentSupervisior/addOrEdit", {
        viewTitle: "Assign Supervisior",
        studentSupervisior: doc
      });
    }
  });
});

//Delete School & Department Records

router.get("/delete/:id", (req, res) => {
  StudentSupervisior.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/studentSupervisior/list");
    } else {
      console.log("Error in Assigning Supervisior" + err);
    }
  });
});

// router.post('/', (req, res) => {
//     if(req.body._id == '')
//         insertRecord(req, res);
//         else{
//             updateRecord(req, res);
//         }
//     });

module.exports = router;
