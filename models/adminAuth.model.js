const mongoose = require("mongoose");

//creating object  for School Schema
var adminAuthSchema = new mongoose.Schema({
  loginId: {
    type: String,
    //This make field not allowed repeated vlaue
    // unique: true,
    //To make this field mandatory to fill.
    required: "This field is Required."
  },

  password: {
    type: String,
    required: "This field is Required."
  }
});

//Call model function
//First parameter is Name of schema, other is Schema Object
//Collection name is become plural  name of model as School here become Schools
mongoose.model("AdminAuth", adminAuthSchema);
