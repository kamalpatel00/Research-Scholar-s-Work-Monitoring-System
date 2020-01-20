//Inside this file we will deal with CRUD operation with school

const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const School = mongoose.model('School');

//create new router with 1st parameter is Default URL
//2nd parameter is Request handler function with req and res
router.get('/', (req, res) => {
    //return response with a string
    res.render("school/addOrEdit", {
        viewTitle : "Insert Schoolllll"
    });
});

router.post('/', (req, res) => {
    if(req.body._id == '')
        insertRecord(req, res);
        else
            updateRecord(req, res);
});

function insertRecord(req, res){
    //create object of school schema
    var school = new School();
    school.schoolId = req.body.schoolId;
    school.schoolName = req.body.schoolName;
    school.save((err, doc) => {
        if(!err)
        res.redirect('school/list');
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("school/addOrEdit", {
                    viewTitle : "Insert School",
                    school: req.body
                });
            }
            else
                console.log('Error in Reccorde insertion');
        }
    });
}

function updateRecord(req, res){
    School.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) =>{
        if(!err){
            res.redirect('school/list');
        }
        else{
            if(err.name == 'validationError'){
                handleValidationError(err, req.body);
                res.render("school/addOrEdit",{
                    viewTitle: 'Update School Detail',
                    school: req.body
                });
            }
            else
                console.log('Error during Recorde update :' +err);
        }
    })
}

// db.inventory.find( { schoolId: "SOM" } )
router.get('/list', (req, res) => {
    School.find(({ schoolId: "SOE" }),(err, docs) => {
        if(!err){
            res.render("school/list", {
                list: docs
            });
        }
        else{
            console.log('Error in retriving School Detail :' + err);
        }
    });
});

function handleValidationError(err,body){
    for(field in err.errors){
        switch (err.errors[field].path){
            case 'schoolId':
                body['schoolIdError'] = err.errors[field].message;
                break;

            case 'schoolName':
                body['schoolNameError'] = err.errors[field].message;
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    School.findById(req.params.id, (err, doc) =>{
        if(!err){
            res.render("school/addOrEdit",{
                viewTitle: "Update School",
                school: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    School.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/school/list');
        }
        else{
            console.log('Error in School delete : ' + err);
        }
    });
});

//exports router object with controller 'router' 
module.exports = router;