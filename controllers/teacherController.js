const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Teacher = mongoose.model('Teacher');
const School_Department = mongoose.model('School_Department');
// const School= mongoose.model('School');
// const Department = mongoose.model('Department');



router.get('/',(req, res) => {
    //res.json('from list');
    School_Department.find((err, docs) =>{
        if(!err){
            res.render("teacher/addOrEdit", {
                viewTitle : "Insert Teacher", list: docs
                });
        }
        else{
            console.log('Error in Retriving Teacher list :' +err);
        }
    });
});

// router.get('/', (req, res) =>{

    
//     School.find((err, docs) =>{
//         if(!err){
//             Department.find((err, docs1) =>{
//                 if(!err){

//             res.render("teacher/addOrEdit", {
//                 viewTitle : "Insert Teacher", list: docs,list1:docs1
//             });
//         }
//         else{
//             console.log('Error in Retriving Teacher list :' +err);
//         }

//         });

//         }
//         else{
//             console.log('Error in Retriving Teacher list :' +err);
//         }
//     });

// });


router.post('/',(req, res) => {
    if(req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

function insertRecord(req, res){
    var teacher = new Teacher();
    teacher.teacherId = req.body.teacherId;
    teacher.teacherFirstName = req.body.teacherFirstName;
    teacher.teacherLastName = req.body.teacherLastName;
    teacher.teacherDob = req.body.teacherDob;
    teacher.teacherGender = req.body.teacherGender;
    teacher.teacherAddress = req.body.teacherAddress;
    teacher.teacherMobile = req.body.teacherMobile;
    teacher.teacherEmail = req.body.teacherEmail;
    teacher.teacherSchool = req.body.teacherSchool;
    teacher.teacherDepartment = req.body.teacherDepartment;
    teacher.teacherQualification = req.body.teacherQualification;
    teacher.teacherSpecialization = req.body.teacherSpecialization;
    teacher.teacherDesignation = req.body.teacherDesignation;
    teacher.save((err, doc) => {
        if(!err)
            res.redirect('teacher/list');
            else{
                if(err.name == 'ValidationError'){
                    handleValidationError(err, req.body);
                    res.render("teacher/addOrEdit",{
                        viewTitle: "Insert Teacher",
                        teacher: req.body
                    });
                }
                else
                    console.log('Error during Teacher records insertion...'+ err);
            }
    });
}

//Update Teacher record
function updateRecord(req, res){
    Teacher.findOneAndUpdate({_id: req.body._id}, req.body,{new:true}, (err, doc) =>{
        if(!err){
            res.redirect('teacher/list');
        }
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("teacher/addOrEdit", {
                    viewTitle: 'Update Teacher',
                    teacher: req.body
                });
            }
            else
                console.log('Error during Teacher Record Update'+ err);
        }
    });
}

router.get('/list',(req, res) => {
    //res.json('from list');
    Teacher.find((err, docs) =>{
        if(!err){
            res.render("teacher/list", {
                list: docs
            });
        }
        else{
            console.log('Error in Retriving Teacher list :' +err);
        }
    });
});

router.get('/department',(req, res) => {
    //res.json('from list');
    Teacher.find((err, docs) =>{
        if(!err){
            res.render("teacher/list", {
                list: docs
            });
        }
        else{
            console.log('Error in Retriving Teacher list :' +err);
        }
    });
});

function handleValidationError(err, body){
    for(field in err.errors)
    {
        switch(err.errors[field].path){
            case 'teacherId':
                body['teacherIdError'] = err.errors[field].message;
                break;

            case 'teacherFirstName':
                body['teacherFirstNameError'] = err.errors[field].message;
                break;

            case 'teacherLastName':
                body['teacherLastNameError'] = err.errors[field].message;
                break;

            case 'teacherDob':
                body['teacherDobError'] = err.errors[field].message;
                break;

            case 'teacherGender':
                body['teacherGenderError'] = err.errors[field].message;
                break;

            case 'teacherAddress':
                body['teacherAddressError'] = err.errors[field].message;
                break;

            case 'teacherMobile':
                body['teacherMobileError'] = err.errors[field].message;
                break;

            case 'teacherEmail':
                body['teacherEmailError'] = err.errors[field].message;
                break;

            case 'teacherSchool':
                body['teacherSchoolError'] = err.errors[field].message;
                break;

            case 'teacherDepartment':
                body['teacherDepartmentError'] = err.errors[field].message;
                break;

            case 'teacherQualification':
                body['teacherQualificationError'] = err.errors[field].message;
                break;

            case 'teacherSpecialization':
                body['teacherSpecializationError'] = err.errors[field].message;
                break;

            case 'teacherDesignation':
                body['teacherDesignationError'] = err.errors[field].message;
                break;
        }
    }
}    


router.get('/:id', (req, res) => {
    Teacher.findById(req.params.id, (err, doc) =>{
        if(!err){
            res.render("teacher/addOrEdit",{
                viewTitle: "Update Teacher",
                teacher: doc
            })
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Teacher.findByIdAndRemove(req.params.id, (err, doc) =>{
        if(!err){
            res.redirect('/teacher/list');
        }
        else{
            console.log('Error in Teacher Delete:' +err);
        }
    });
});

module.exports = router;