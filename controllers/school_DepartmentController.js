const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const School_Department = mongoose.model('School_Department');

router.get('/', (req, res) => {
    res.render('school_Department/addOrEdit',{
        viewTitle: "Insert School & Department Info"
    });
});

//Insert Records and function to Update Records

router.post('/',(req, res) => {
    if(req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);   
});

function insertRecord(req, res){
    var school_Department = new School_Department();
    school_Department.schoolId = req.body.schoolId;
    school_Department.schoolName = req.body.schoolName;
    school_Department.departmentId = req.body.departmentId;
    school_Department.departmentName = req.body.departmentName;
    school_Department.save((err, doc) => {
        if(!err){
            res.redirect('school_Department/list');
        }
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render('school_Department/addOrEdit',{
                    viewTitle: 'Insert School & Department',
                    school_Department: req.body
                });
            }
            else
                Console.log('Error During School Department insertion:' + err);
        }
    });
        
}

//Update School & Department Record
function updateRecord(req, res){
    School_Department.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) =>{
        if(!err){
            res.redirect('school_Department/list');
        }
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render('school_Department/addOrEdit',{
                    viewTitle: 'Update School & Department',
                    school_Department: req.body
                });
            }
            else
                console.log('Error during records update:' +err);
        }
    });
}


router.get('/list', (req, res) =>{
    School_Department.find((err, docs) =>{
        if(!err){
            res.render('school_Department/list',{
                list: docs
            });
        }
        else{
            console.log('Error in retriving School_Department list:' +err);
        }
    });
});

function handleValidationError(err, body){
    for(field in err.errors)
    {
        switch(err.errors[field].path){
            case 'schoolId':
                body['schoolIdError'] = err.errors[field].message;
                break;
            case 'schoolName':
                body['schoolNameError'] = err.errors[field].message;
                break;
            case 'departmentId':
                body['departmentIdError'] = err.errors[field].message;
                break;
            case 'departmentName':
                body['departmentNameError'] = err.errors[field].message;
            default:
                break;

        }
    }
}

//Show the Record in form page

router.get('/:id',(req, res) =>{
    School_Department.findById(req.params.id, (err, doc) =>{
        if(!err){
            res.render("school_Department/addOrEdit", {
                viewTitle: 'Update School & Department',
                school_Department: doc
            });
        }
    });
});

//Delete School & Department Records

router.get('/delete/:id',(req, res) =>{
    School_Department.findByIdAndRemove(req.params.id, (err, doc) =>{
        if(!err){
            res.redirect('/school_Department/list');
        }
        else{
            console.log('Error in School & Department Delete:' +err);
        }
    });
});

module.exports = router;