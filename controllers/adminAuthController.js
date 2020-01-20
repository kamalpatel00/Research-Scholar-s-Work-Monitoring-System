const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const AdminAuth = mongoose.model("AdminAuth");
// const Student = mongoose.model("Student");

// router.get("/", (req, res) => {
//   //res.json('from list');
//   Student.find((err, docs) => {
//     if (!err) {
//       console.log(docs);
//       res.render("adminAuth/addOrEdit", {
//         viewTitle: "Input Login Details",
//         list: docs
//       });
//     } else {
//       console.log("Error in Retriving Teacher list :" + err);
//     }
//   });
// });
router.get("/", (req, res) => {
  res.render("adminAuth/addOrEdit", {
    viewTitle: "ADD NEW ADMIN"
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  // Create Schema
  var adminAuth = new AdminAuth();
  adminAuth.loginId = req.body.loginId;
  adminAuth.password = req.body.password;
  adminAuth.save((err, doc) => {
    if (!err) {
      res.redirect("adminAuth/list");
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("adminAuth/addOrEdit", {
          viewTitle: "ADD NEW ADMIN Detail",
          adminAuth: req.body
        });
      } else Console.log("Error  NEW ADMIN detail insertion:" + err);
    }
  });
}

//   // Check if student exists in DB
//   Student.findOne(
//     { registrationNumber: req.body.registrationNumber },
//     (err, result) => {
//       if (result) {
//         // else {
//         adminAuth.save((err, doc) => {
//           // If saved successfully, show list
//           // console.log(docs);
//           if (!err) res.redirect("adminAuth/list");
//           // If error, check for validation error
//           if (err) {
//             if (err.name == "ValidationError") {
//               handleValidationError(err, req.body);

//               res.render("adminAuth/addOrEdit", {
//                 viewTitle: "Insert Student Login Detail",
//                 adminAuth: req.body
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
  AdminAuth.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("adminAuth/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("adminAuth/addOrEdit", {
            viewTitle: "Update Admin Login Details",
            adminAuth: req.body
          });
        } else console.log("Error during records update:" + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  // res.json('from ist');
  AdminAuth.find((err, docs) => {
    if (!err) {
      res.render("adminAuth/list", {
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
      case "loginId":
        body["loginIdError"] = err.errors[field].message;
        break;

      case "password":
        body["passwordError"] = err.errors[field].message;
        break;

      default:
        break;
    }
  }
}

//Show the Record in form page

router.get("/:id", (req, res) => {
  AdminAuth.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("adminAuth/addOrEdit", {
        viewTitle: "Update Admin Login Details",
        adminAuth: doc
      });
    }
  });
});

//delete records
router.get("/delete/:id", (req, res) => {
  AdminAuth.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/adminAuth/list");
    } else {
      console.log("Error in Teacher Login detail Delete:" + err);
    }
  });
});

module.exports = router;
