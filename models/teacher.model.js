const mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
    teacherId: {
        type: String,
        required: 'This field is required.'
    },
    teacherFirstName: {
        type: String,
        required: 'This field is required.'
    },
    teacherLastName: {
        type: String,
        required: 'This field is required.'
    },
    teacherDob:{
        type: String,
        required: 'Insert DOB .'
    },
    teacherGender:{
        type: String,
        required: 'This field is required.'
    },
    teacherAddress: {
        type: String,
        required: 'This field is required.'
    },
    teacherMobile: {
        type: Number,
        required: 'Enter Valid mobile no.'
    },
    teacherEmail: {
        type: String,
        required: 'Please input Valid email.'
    },
    teacherSchool: {
        type: String,
        required: 'This field is required.'
    },
    teacherDepartment: {
        type: String,
        required: 'This field is required.'
    },
    teacherQualification: {
        type: String,
        required: 'This field is required.'
    },
    teacherSpecialization: {
        type: String,
        required: 'This field is required.'
    },
    teacherDesignation: {
        type: String,
        required: 'This field is required.'
    }
});

mongoose.model('Teacher', teacherSchema);