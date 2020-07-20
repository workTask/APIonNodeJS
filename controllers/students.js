var Students = require('../models/students');


exports.all = function (req,res) {
    Students.all(function (err, students){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(students);
    });
}
exports.findById = function(req,res){
    Students.findById =(req.params.id, function (err, result){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(result);
    });
}
exports.create = function (req, res){
    const student = {
        // id:Date.now(),
         fname:req.body.fname,
         lname:req.body.lname
     }
     Students.create = (student, function (err, result){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(result);
       //res.sendStatus(200);    
    });   
}
exports.update = function (req, res){
    const student = {
        // id:Date.now(),
         fname:req.body.fname,
         lname:req.body.lname
     }
     Students.create = (req.body.id, student, function (err, result){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(result);
       //res.sendStatus(200);    
    });   
}
exports.delete = function(req,res){
    Students.delete =(req.params.id, function (err, result){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(result);
    });

}