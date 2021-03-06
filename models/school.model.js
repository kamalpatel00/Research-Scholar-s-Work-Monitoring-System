const mongoose = require('mongoose');

//creating object  for School Schema
var schoolSchema = new mongoose.Schema({

    schoolId: {
        type: String,
        //This make field not allowed repeated vlaue
        unique: true,
        //To make this field mandatory to fill.
        required: "This field is Required."
    },  

    schoolName: {
        type: String,
        unique: true,
        required: "This field is Required."
    }
});

//Call model function
//First parameter is Name of schema, other is Schema Object
//Collection name is become plural  name of model as School here become Schools
mongoose.model('School',schoolSchema);