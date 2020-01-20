const mongoose = require("mongoose");

//creating object  for School Schema
var teacherAuthSchema = new mongoose.Schema({
  teacherId: {
    type: String,
    required: "this field is required."
    // unique:true
  },

  teacherLoginID: {
    type: String,
    //This make field not allowed repeated vlaue
    // unique: true,
    //To make this field mandatory to fill.
    required: "This field is Required."
  },

  teacherPassword: {
    type: String,
    required: "This field is Required."
  }
});

//Call model function
//First parameter is Name of schema, other is Schema Object
//Collection name is become plural  name of model as School here become Schools
mongoose.model("TeacherAuth", teacherAuthSchema);
