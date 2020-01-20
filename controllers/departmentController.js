const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Department = mongoose.model('Department');

router.get('/', (req, res) => {
    res.render("department/deptAddOrEdit", {
        viewTitle : "Insert Department"
    });    
});

router.post('/', (req, res) => {
    if(req.body._id == '')
        insertRecord(req, res);
        else{
            updateRecord(req, res);
        }
    });

function insertRecord(req, res){
    //Create object of Department schema
    var department = new Department();
    department.departmentId = req.body.departmentId;
    department.departmentName = req.body.departmentName;
    department.save((err, doc) => {
        if(!err)
            res.redirect('department/list');
            else{
                if(err.name == 'ValidationError'){
                    handleValidationError(err, req.body);
                    res.render("department/deptAddOrEdit",{
                        viewTitle: "Insert Department",
                        department: req.body
                    });
                }
                else
                    console.log('Error during insert Record: ' + err);
            }
    });
}

function updateRecord(req, res){
    Department.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) =>{
        if(!err){
            res.redirect('department/list');
        }
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body); 
                res.render("department/deptAddOrEdit",{
                    viewTitle: "Update Department",
                    department: req.body
                });          
            }
            else
                console.log('Error During recorde update :' + err);
        }
    });
}

router.get('/list', (req, res) => {
    //To retrieve recorde from Schema
    Department.find((err, docs) => {
        if(!err){
            res.render("department/list",{
                //Return the docs inside list 
                list: docs
            });
        }
        else{
            console.log('Error in Retrieving Department list :' + err);
        }
    });
});

function handleValidationError(err, body){
    for(field in err.errors){
        switch (err.errors[field].path){
            case 'departmentId':
                body['departmentIdError'] = err.errors[field].message;
                break;
            case 'departmentName':
                body['departmentNameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Department.findById(req.params.id, (err, doc) =>{
        if(!err){
            res.render("department/deptAddOrEdit",{
                viewTitle: "Update Department",
                department: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Department.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/department/list');
        }
        else{
            console.log('Error in Department delete : ' + err);
        }
    });
});

module.exports = router;