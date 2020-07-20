var db = require('../dbForP1/dbP1');
const { ObjectID } = require('mongodb');

exports.all = function(callback){
    db.get().collection('students').find().toArray(function(err, results){
        callback(err,results);
    })
}
exports.findById = function (id, callback){
    db.get().collection('students').findOne({_id:ObjectID(id)}, function (err, result){
        callback(err,result);
    })
}
exports.create = function (student, callback){
    db.get().collection('students').insert(student, function (err,result){
        callback(err,result);
    })
}
exports.update = function (id, student, callback){
    db.get().collection('students').findOne({_id:ObjectID(id)}, student, function (err,result){
        callback(err,result);
    })
}
exports.delete = function (student, callback){
    db.get().collection('students').deleteOne({_id:ObjectID(id)}, function (err,result){
        callback(err,result);
    })
}
