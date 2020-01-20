const mongoose = require("mongoose");

var teacherLoginSchema = new mongoose.Schema({
  uname: {
    type: String
  },
  passsword: {
    type: String
  }
});

mongoose.model("TeacherLogin", teacherLoginSchema);
