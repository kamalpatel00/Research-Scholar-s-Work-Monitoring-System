const mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: "This field is required."
  },
  studentFirstName: {
    type: String,
    required: "This field is required."
  },
  studentLastName: {
    // type: String,
    // required: 'This field is required.'
  },
  studentDob: {
    // type: String,
    // required: 'Insert DOB .'
  },
  studentGender: {
    // type: String,
    // required: 'This field is required.'
  },
  studentMartialStatus: {
    // type: String,
    // required: 'This field is required.'
  },
  studentfatherHusbandName: {
    // type: Number,
    // required: 'Enter Valid '
  },
  studentMobile: {
    type: String
  },
  studentEmail: {
    // type: String,
    // required: 'Please input Valid email.'
  },

  studentLocalAddress: {
    // type: String,
    // required: 'This field is required.'
  },
  studentParamanentAddress: {
    // type: String,
    // required: 'This field is required.'
  },
  studentMentorName: {
    // type: String,
    // required: 'This field is required.'
  },
  studentSchool: {
    // type: String,
    // required: 'This field is required.'
  },
  studentDepartment: {
    // type: String,
    // required: 'This field is required.'
  },
  studentCategory: {
    // type: String,
    // required: 'This field is required.'
  },
  studentTotalSemester: {
    // type: String,
    // required: 'This field is required.'
  },
  studentCurrentSemester: {
    // type: String,
    // required: 'This field is required.'
  },
  studentLastDegree: {
    // type: String,
    // required: 'This field is required.'
  },
  studentCourse: {
    // type: String,
    // required: 'This field is required.'
  },
  studentLastPercentage: {
    // type: String,
    // required: 'This field is required.'
  },
  studentOther: {
    // type: String,
    // required: 'This field is required.'
  },

  studentOtherPercentage: {
    // type: String,
    // required: 'This field is required.'
  },
  studentCountry: {
    // type: String,
    // required: 'This field is required.'
  },
  studentNationality: {
    // type: String,
    // required: 'This field is required.'
  },
  studentPassport: {
    // type: String,
    // required: 'This field is required.'
  },
  studentHCIContact: {
    // type: String,
    // required: 'This field is required.'
  }
});

studentSchema.path("studentMobile").validate(val => {
  mobileRegex = /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/;
  return mobileRegex.test(val);
}, "Invalid Mobile Numberrrr");

studentSchema.path("studentFirstName").validate(val => {
  firstNameRegex = /^[A-Za-z]+$/;
  return firstNameRegex.test(val);
}, "Invalid First Name");

studentSchema.path("studentLastName").validate(val => {
  lastNameRegex = /^[A-Za-z]+$/;
  return lastNameRegex.test(val);
}, "Invalid Last Name");

studentSchema.path("studentEmail").validate(val => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid Email");

studentSchema.path("studentLastPercentage").validate(val => {
  percentageRegex = /^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$/;
  return percentageRegex.test(val);
}, "Input Valid Percentage Number");

mongoose.model("Student", studentSchema);
