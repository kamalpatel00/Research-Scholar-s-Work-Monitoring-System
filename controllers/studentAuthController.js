const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const StudentAuth = mongoose.model("StudentAuth");
const Student = mongoose.model("Student");

router.get("/", (req, res) => {
  //res.json('from list');
  Student.find((err, docs) => {
    if (!err) {
      console.log(docs);
      res.render("studentAuth/addOrEdit", {
        viewTitle: "Input Login Details",
        list: docs
      });
    } else {
      console.log("Error in Retriving Teacher list :" + err);
    }
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  // Create Schema
  var studentAuth = new StudentAuth();
  studentAuth.studentRegistrationNumber = req.body.studentRegistrationNumber;
  studentAuth.studentId = req.body.studentId;
  studentAuth.studentPassword = req.body.studentPassword;
  studentAuth.save((err, doc) => {
    if (!err) {
      res.redirect("studentAuth/list");
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("studentAuth/addOrEdit", {
          viewTitle: "Insert Student Authrization Detail",
          studentAuth: req.body
        });
      } else
        Console.log("Error in Student Authrozation detail insertion:" + err);
    }
  });
}

//   // Check if student exists in DB
//   Student.findOne(
//     { registrationNumber: req.body.registrationNumber },
//     (err, result) => {
//       if (result) {
//         // else {
//         studentAuth.save((err, doc) => {
//           // If saved successfully, show list
//           // console.log(docs);
//           if (!err) res.redirect("studentAuth/list");
//           // If error, check for validation error
//           if (err) {
//             if (err.name == "ValidationError") {
//               handleValidationError(err, req.body);

//               res.render("studentAuth/addOrEdit", {
//                 viewTitle: "Insert Student Login Detail",
//                 studentAuth: req.body
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
  StudentAuth.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("studentAuth/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("studentAuth/addOrEdit", {
            viewTitle: "Update Login Details",
            studentAuth: req.body
          });
        } else console.log("Error during records update:" + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  // res.json('from ist');
  StudentAuth.find((err, docs) => {
    if (!err) {
      res.render("studentAuth/list", {
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
      case "studentId":
        body["studentIdError"] = err.errors[field].message;
        break;
      case "studentPassword":
        body["studentPasswordError"] = err.errors[field].message;
        break;
      case "studentRegistrationNumber":
        body["studentRegistrationNumberError"] = err.errors[field].message;
        break;

      default:
        break;
    }
  }
}

//Show the Record in form page

router.get("/:id", (req, res) => {
  StudentAuth.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("studentAuth/addOrEdit", {
        viewTitle: "Update Login Details",
        studentAuth: doc
      });
    }
  });
});

//delete records
router.get("/delete/:id", (req, res) => {
  StudentAuth.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/studentAuth/list");
    } else {
      console.log("Error in student Login detail Delete:" + err);
    }
  });
});

module.exports = router;
