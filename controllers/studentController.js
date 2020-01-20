const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Student = mongoose.model("Student");
const Teacher = mongoose.model("Teacher");
const School_Department = mongoose.model("School_Department");

router.get("/", (req, res) => {
  School_Department.find((err, docs) => {
    if (!err) {
      Teacher.find((err, docs1) => {
        if (!err) {
          res.render("student/addOrEdit", {
            viewTitle: "Insert Teacher",
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

//create new router with 1st parameter is Default URL
//2nd parameter is Request handler function with req and res
router.get("/", (req, res) => {
  //return response with a string
  res.render("student/addOrEdit", {
    viewTitle: "Insert Student"
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") {
    // res.json('Insert');
    insertRecord(req, res);
  } else {
    // res.json('update');
    updateRecord(req, res);
  }
});

function insertRecord(req, res) {
  var student = new Student();
  student.registrationNumber = req.body.registrationNumber;
  student.studentFirstName = req.body.studentFirstName;
  student.studentLastName = req.body.studentLastName;
  student.studentDob = req.body.studentDob;
  student.studentGender = req.body.studentGender;
  student.studentMartialStatus = req.body.studentMartialStatus;
  student.studentfatherHusbandName = req.body.studentfatherHusbandName;
  student.studentMobile = req.body.studentMobile;
  student.studentEmail = req.body.studentEmail;
  student.studentLocalAddress = req.body.studentLocalAddress;
  student.studentParamanentAddress = req.body.studentParamanentAddress;
  student.studentMentorName = req.body.studentMentorName;
  student.studentSchool = req.body.studentSchool;
  student.studentDepartment = req.body.studentDepartment;
  student.studentCategory = req.body.studentCategory;
  student.studentTotalSemester = req.body.studentTotalSemester;
  student.studentCurrentSemester = req.body.studentCurrentSemester;
  student.studentLastDegree = req.body.studentLastDegree;
  student.studentCourse = req.body.studentCourse;
  student.studentLastPercentage = req.body.studentLastPercentage;
  student.studentOther = req.body.studentOther;
  student.studentOtherPercentage = req.body.studentOtherPercentage;
  student.studentCountry = req.body.studentCountry;
  student.studentNationality = req.body.studentNationality;
  student.studentPassport = req.body.studentPassport;
  student.studentHCIContact = req.body.studentHCIContact;
  student.save((err, doc) => {
    if (!err) {
      // insert code to check for duplicate reg numbers
      res.redirect("student/list");
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("student/addOrEdit", {
          viewTitle: "Insert Student",
          student: req.body
        });
      } else console.log("Error during records insertion: " + err);
    }
  });
}

router.get("/list", (req, res) => {
  // res.json('from list');
  Student.find((err, docs) => {
    if (!err) {
      res.render("student/list", {
        list: docs
      });
    } else {
      console.log("Error in Retrieving student LIst:" + err);
    }
  });
});

//Validation error FUnction
function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "registrationNumber":
        body["registrationNumberError"] = err.errors[field].message;
        break;

      case "studentFirstName":
        body["studentFirstNameError"] = err.errors[field].message;
        break;

      case "studentLastName":
        body["studentLastNameError"] = err.errors[field].message;
        break;

      case "studentDob":
        body["studentDobError"] = err.errors[field].message;
        break;

      case "studentGender":
        body["studentGenderError"] = err.errors[field].message;
        break;

      case "studentfatherHusbandName":
        body["studentfatherHusbandNameError"] = err.errors[field].message;
        break;

      case "studentMobile":
        body["studentMobileError"] = err.errors[field].message;
        break;

      case "studentEmail":
        body["studentEmailError"] = err.errors[field].message;
        break;

      case "studentLocalAddress":
        body["studentLocalAddressError"] = err.errors[field].message;
        break;

      case "studentParamanentAddress":
        body["studentParamanentAddressError"] = err.errors[field].message;
        break;

      case "studentMentorName":
        body["studentMentorNameError"] = err.errors[field].message;
        break;

      case "studentSchool":
        body["studentSchoolError"] = err.errors[field].message;
        break;

      case "studentDepartment":
        body["studentDepartmentError"] = err.errors[field].message;
        break;

      case "studentCategory":
        body["studentCategoryError"] = err.errors[field].message;
        break;

      case "studentTotalSemester":
        body["studentTotalSemesterError"] = err.errors[field].message;
        break;

      case "studentCurrentSemeste":
        body["studentCurrentSemesteError"] = err.errors[field].message;
        break;

      case "studentLastDegree":
        body["studentLastDegreeError"] = err.errors[field].message;
        break;

      case "studentCourse":
        body["studentCourseError"] = err.errors[field].message;
        break;

      case "studentLastPercentage":
        body["studentLastPercentageError"] = err.errors[field].message;
        break;

      case "studentOther":
        body["studentOtherError"] = err.errors[field].message;
        break;

      case "studentOtherPercentage":
        body["studentOtherPercentageError"] = err.errors[field].message;
        break;

      case "studentCountry":
        body["studentCountryError"] = err.errors[field].message;
        break;

      case "studentNationality":
        body["studentNationalityError"] = err.errors[field].message;
        break;

      case "studentPassport":
        body["studentPassportError"] = err.errors[field].message;
        break;

      case "studentPassport":
        body["studentPassportError"] = err.errors[field].message;
        break;

      case "studentHCIContact":
        body["studentHCIContactError"] = err.errors[field].message;
        break;

      default:
        break;
    }
  }
}

function updateRecord(req, res) {
  Student.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("student/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("student/addOrEdit", {
            viewTitle: "Update Student",
            student: req.body
          });
        } else {
          console.log("Errro During Records Update:" + err);
        }
      }
    }
  );
}

router.get("/:id", (req, res) => {
  Student.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("student/addOrEdit", {
        viewTitle: "Update Student",
        student: doc
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Student.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/student/list");
    } else {
      console.log("Error in Student delete : " + err);
    }
  });
});

module.exports = router;
