const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const DoctoralCommittee = mongoose.model("DoctoralCommittee");
const School_Department = mongoose.model("School_Department");
const Teacher = mongoose.model("Teacher");

router.get("/", (req, res) => {
  School_Department.find((err, docs) => {
    if (!err) {
      Teacher.find((err, docs1) => {
        if (!err) {
          res.render("doctoralCommittee/addOrEdit", {
            viewTitle: "Add Doctoral Member",
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
  res.render("doctoralCommittee/addOrEdit", {
    viewTitle: "Add Doctoral Member"
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  var doctoralCommittee = new DoctoralCommittee();
  doctoralCommittee.teacherId = req.body.teacherId;
  doctoralCommittee.school = req.body.school;
  doctoralCommittee.department = req.body.department;
  doctoralCommittee.specialization = req.body.specialization;

  doctoralCommittee.save((err, doc) => {
    if (!err) {
      res.redirect("doctoralCommittee/list");
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("doctoralCommittee/addOrEdit", {
          viewTitle: "Add DRC/ CRC Member",
          doctoralCommittee: req.body
        });
      } else Console.log("Error During School Department insertion:" + err);
    }
  });
}

//Update School & Department Record
function updateRecord(req, res) {
  DoctoralCommittee.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("doctoralCommittee/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("doctoralCommittee/addOrEdit", {
            viewTitle: "Add Doctoral Member",
            doctoralCommittee: req.body
          });
        } else console.log("Error during records update:" + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  DoctoralCommittee.find((err, docs) => {
    if (!err) {
      res.render("doctoralCommittee/list", {
        list: docs
      });
    } else {
      console.log("Error in retriving Research Committee list:" + err);
    }
  });
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "teacherId":
        body["teacherIdError"] = err.errors[field].message;
        break;
      case "school":
        body["schoolError"] = err.errors[field].message;
        break;
      case "department":
        body["departmenError"] = err.errors[field].message;
        break;
      case "specialization":
        body["specializationError"] = err.errors[field].message;
        break;

      default:
        break;
    }
  }
}

//Show the Record in form page

router.get("/:id", (req, res) => {
  DoctoralCommittee.findById(req.params.id, (err, doc) => {
    // School_Department.find((err, docs) => {
    //   if (!err) {
    //     Teacher.find((err, docs1) => {
    //       if (!err) {
    //           res.render("doctoralCommittee/addOrEdit", {
    //             viewTitle: "Add DRC/ CRC Member",
    //             list: docs,
    //             list1: docs1
    //           });
    //         } else {
    //           console.log("Error in Retriving Teacher list :" + err);
    //         }
    //       });
    //     } else {
    //       console.log("Error in Retriving Teacher list :" + err);
    //     }
    //   });
    if (!err) {
      School_Department.find((err, docs) => {
        if (!err) {
          Teacher.find((err, docs1) => {
            if (!err) {
              res.render("doctoralCommittee/addOrEdit", {
                viewTitle: "Update Doctoral Committee Member",
                list: docs,
                list1: docs1,
                doctoralCommittee: doc
              });
            }
          });
        }
      });
    }
  });
});

//Delete School & Department Records

router.get("/delete/:id", (req, res) => {
  DoctoralCommittee.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/doctoralCommittee/list");
    } else {
      console.log("Error in  Doctoral Member Deletion" + err);
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
