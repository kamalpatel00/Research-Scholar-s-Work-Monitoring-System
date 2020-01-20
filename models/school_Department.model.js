const mongoose = require('mongoose');

var school_DepartmentSchema = new mongoose.Schema({
    schoolId: {
        type: String,
        required: 'This field is required.'
    },
    schoolName: {
        type: String,
        required: 'This field is required.'
    },
    departmentId: {
        type: String,
        required: 'This field is required.'
    },
    departmentName: {
        type: String,
        required: 'This field is required.'
    }
});


//model function schema name and schema object
mongoose.model('School_Department',school_DepartmentSchema);