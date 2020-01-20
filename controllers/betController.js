const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Bet = mongoose.model("Bet");
const School_Department = mongoose.model("School_Department");
// const Teacher = mongoose.model("Teacher");
const Teacher = mongoose.model("Teacher");

router.get("/", (req, res) => {
  School_Department.find((err, docs) => {
    if (!err) {
      Teacher.find((err, docs1) => {
        if (!err) {
          res.render("bet/addOrEdit", {
            viewTitle: "Add Board Of Examiner Of Thisis Member",
            list: docs,
            list1: docs1
          });
        } else {
          console.log("Error in Retriving BET list :" + err);
        }
      });
    } else {
      console.log("Error in Retriving BET list :" + err);
    }
  });
});

router.get("/", (req, res) => {
  res.render("bet/addOrEdit", {
    viewTitle: "Add DRC/ CRC Member"
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  var bet = new Bet();
  bet.teacherId = req.body.teacherId;
  bet.school = req.body.school;
  bet.department = req.body.department;
  bet.deg = req.body.deg;
  bet.university = req.body.university;

  bet.save((err, doc) => {
    if (!err) {
      res.redirect("bet/list");
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("bet/addOrEdit", {
          viewTitle: "Add DRC/ CRC Member",
          bet: req.body
        });
      } else Console.log("Error During BET Member insertion:" + err);
    }
  });
}

//Update School & Department Record
function updateRecord(req, res) {
  Bet.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("bet/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("bet/addOrEdit", {
            viewTitle: "Research Committee",
            bet: req.body
          });
        } else console.log("Error during records update:" + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  Bet.find((err, docs) => {
    if (!err) {
      res.render("bet/list", {
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
  Bet.findById(req.params.id, (err, doc) => {
    if (!err) {
      School_Department.find((err, docs) => {
        if (!err) {
          Teacher.find((err, docs1) => {
            if (!err) {
              res.render("bet/addOrEdit", {
                viewTitle: "Update BET Member",
                list: docs,
                list1: docs1,
                bet: doc
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
  Bet.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/bet/list");
    } else {
      console.log("Error in Assigning BET" + err);
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
