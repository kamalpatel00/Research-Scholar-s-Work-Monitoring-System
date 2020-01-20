const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const ResearchCommittee = mongoose.model("ResearchCommittee");
const School_Department = mongoose.model("School_Department");
const Teacher = mongoose.model("Teacher");

router.get("/", (req, res) => {
  School_Department.find((err, docs) => {
    if (!err) {
      Teacher.find((err, docs1) => {
        if (!err) {
          res.render("researchCommittee/addOrEdit", {
            viewTitle: "Add Research Committee Member",
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
  res.render("researchCommittee/addOrEdit", {
    viewTitle: "Add Research Committee Member"
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  var researchCommittee = new ResearchCommittee();
  researchCommittee.teacherId = req.body.teacherId;
  researchCommittee.school = req.body.school;
  researchCommittee.department = req.body.department;
  researchCommittee.deg = req.body.deg;

  researchCommittee.save((err, doc) => {
    if (!err) {
      res.redirect("researchCommittee/list");
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("researchCommittee/addOrEdit", {
          viewTitle: "Add Research Committee Member",
          researchCommittee: req.body
        });
      } else Console.log("Error During School Department insertion:" + err);
    }
  });
}

//Update School & Department Record
function updateRecord(req, res) {
  ResearchCommittee.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("researchCommittee/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("researchCommittee/addOrEdit", {
            viewTitle: "Research Committee",
            researchCommittee: req.body
          });
        } else console.log("Error during records update:" + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  ResearchCommittee.find((err, docs) => {
    if (!err) {
      res.render("researchCommittee/list", {
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
      case "deg":
        body["degError"] = err.errors[field].message;
        break;

      default:
        break;
    }
  }
}

//Show the Record in form page

router.get("/:id", (req, res) => {
  ResearchCommittee.findById(req.params.id, (err, doc) => {
    // School_Department.find((err, docs) => {
    //   if (!err) {
    //     Teacher.find((err, docs1) => {
    //       if (!err) {
    //           res.render("researchCommittee/addOrEdit", {
    //             viewTitle: "Add Research Committee Member",
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
              res.render("researchCommittee/addOrEdit", {
                viewTitle: "Update Research Committee Member",
                list: docs,
                list1: docs1,
                researchCommittee: doc
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
  ResearchCommittee.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/researchCommittee/list");
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
