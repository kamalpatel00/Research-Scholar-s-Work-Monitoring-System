const mongoose = require("mongoose");

//creating object  for School Schema
var researchCommitteeSchema = new mongoose.Schema({
  teacherId: {
    type: String,
    //This make field not allowed repeated vlaue
    // unique: true,
    //To make this field mandatory to fill.
    required: "This field is Required."
  },

  school: {
    type: String,
    // unique: true,
    required: "This field is Required."
  },
  department: {
    type: String,
    // unique: true,
    required: "This field is Required."
  },
  deg: {
    type: String,
    // unique: true,
    required: "This field is Required."
  }
});

//Call model function
//First parameter is Name of schema, other is Schema Object
//Collection name is become plural  name of model as School here become Schools
mongoose.model("ResearchCommittee", researchCommitteeSchema);
