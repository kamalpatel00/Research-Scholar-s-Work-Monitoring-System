const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const DrcCrc = mongoose.model("DrcCrc");
const School_Department = mongoose.model("School_Department");
const Teacher = mongoose.model("Teacher");

router.get("/", (req, res) => {
  School_Department.find((err, docs) => {
    if (!err) {
      Teacher.find((err, docs1) => {
        if (!err) {
          res.render("drcCrc/addOrEdit", {
            viewTitle: "Add DRC/ CRC Member",
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
  res.render("drcCrc/addOrEdit", {
    viewTitle: "Add DRC/ CRC Member"
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  var drcCrc = new DrcCrc();
  drcCrc.teacherId = req.body.teacherId;
  drcCrc.school = req.body.school;
  drcCrc.department = req.body.department;
  drcCrc.deg = req.body.deg;

  drcCrc.save((err, doc) => {
    if (!err) {
      res.redirect("drcCrc/list");
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("drcCrc/addOrEdit", {
          viewTitle: "Add DRC/ CRC Member",
          drcCrc: req.body
        });
      } else Console.log("Error During School Department insertion:" + err);
    }
  });
}

//Update School & Department Record
function updateRecord(req, res) {
  DrcCrc.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("drcCrc/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("drcCrc/addOrEdit", {
            viewTitle: "Research Committee",
            drcCrc: req.body
          });
        } else console.log("Error during records update:" + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  DrcCrc.find((err, docs) => {
    if (!err) {
      res.render("drcCrc/list", {
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
  DrcCrc.findById(req.params.id, (err, doc) => {
    // School_Department.find((err, docs) => {
    //   if (!err) {
    //     Teacher.find((err, docs1) => {
    //       if (!err) {
    //           res.render("drcCrc/addOrEdit", {
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
              res.render("drcCrc/addOrEdit", {
                viewTitle: "Update Research Committee Member",
                list: docs,
                list1: docs1,
                drcCrc: doc
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
  DrcCrc.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/drcCrc/list");
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
