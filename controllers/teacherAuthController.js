const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const TeacherAuth = mongoose.model("TeacherAuth");
// const Student = mongoose.model("Student");

// router.get("/", (req, res) => {
//   //res.json('from list');
//   Student.find((err, docs) => {
//     if (!err) {
//       console.log(docs);
//       res.render("teacherAuth/addOrEdit", {
//         viewTitle: "Input Login Details",
//         list: docs
//       });
//     } else {
//       console.log("Error in Retriving Teacher list :" + err);
//     }
//   });
// });
router.get("/", (req, res) => {
  res.render("teacherAuth/addOrEdit", {
    viewTitle: "Insert Teacher Login Info"
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  // Create Schema
  var teacherAuth = new TeacherAuth();
  teacherAuth.teacherId = req.body.teacherId;
  teacherAuth.teacherLoginID = req.body.teacherLoginID;
  teacherAuth.teacherPassword = req.body.teacherPassword;
  teacherAuth.save((err, doc) => {
    if (!err) {
      res.redirect("teacherAuth/list");
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("teacherAuth/addOrEdit", {
          viewTitle: "Insert Teacher Authrization Detail",
          teacherAuth: req.body
        });
      } else
        Console.log("Error in Teacher Authrozation detail insertion:" + err);
    }
  });
}

//   // Check if student exists in DB
//   Student.findOne(
//     { registrationNumber: req.body.registrationNumber },
//     (err, result) => {
//       if (result) {
//         // else {
//         teacherAuth.save((err, doc) => {
//           // If saved successfully, show list
//           // console.log(docs);
//           if (!err) res.redirect("teacherAuth/list");
//           // If error, check for validation error
//           if (err) {
//             if (err.name == "ValidationError") {
//               handleValidationError(err, req.body);

//               res.render("teacherAuth/addOrEdit", {
//                 viewTitle: "Insert Student Login Detail",
//                 teacherAuth: req.body
//               });
//             }
//           }
//         }); // save method
//       } // inner else
//       // If does not exist, throw error
//       if (!result) {
//         // console.log(result);
//         console.log("No such student found");
//         res.render("ERROR/regMissing");
//       }
//     }
//   );
// }

//Update School & Department Record
function updateRecord(req, res) {
  TeacherAuth.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("teacherAuth/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("teacherAuth/addOrEdit", {
            viewTitle: "Update Login Details",
            teacherAuth: req.body
          });
        } else console.log("Error during records update:" + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  // res.json('from ist');
  TeacherAuth.find((err, docs) => {
    if (!err) {
      res.render("teacherAuth/list", {
        list: docs
      });
    } else {
      console.log("Error in Display");
    }
  });
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "teacherId":
        body["teacherIdError"] = err.errors[field].message;
        break;
      case "teacherLoginID":
        body["teacherLoginIDError"] = err.errors[field].message;
        break;
      case "teacherPassword":
        body["teacherPasswordError"] = err.errors[field].message;
        break;

      default:
        break;
    }
  }
}

//Show the Record in form page

router.get("/:id", (req, res) => {
  TeacherAuth.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("teacherAuth/addOrEdit", {
        viewTitle: "Update Login Details",
        teacherAuth: doc
      });
    }
  });
});

//delete records
router.get("/delete/:id", (req, res) => {
  TeacherAuth.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/teacherAuth/list");
    } else {
      console.log("Error in Teacher Login detail Delete:" + err);
    }
  });
});

module.exports = router;
