const express = require('express');
const bodyParser = require('body-parser');
const ObjectID  = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv').config();

app = express();

var db;

const port = process.env.PORT;
//templates
app.set('view engine','hbs');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req,res) => {
      res.render('home');
});
// show list students
app.get('/students', (req,res) => {
    db.collection('students').find().toArray(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs)
        //res.sendStatus(200);  
    })
});
//show student to id
app.get('/students/:id', (req,res) => {
    db.collection('students').findOne({_id:ObjectID(req.params.id)}, function (err, doc) {
        if (err){
            console.log(err);
            res.sendStatus(500);
        }   
        //res.send(doc);
        res.sendStatus(200);
      })
});
// added student
app.post('/students', (req,res) => {
    console.log(req.body);
    const student = {
       // id:Date.now(),
        fname:req.body.fname,
        lname:req.body.lname
    }
    db.collection('students').insert(student, (err,result)=>{
        if (err){
            console.log('error post method',err)
            return res.sendStatus(500);
        }
        res.send(student);
       //res.sendStatus(200);
    })
   
});
//update student
app.put('/students/:id', (req,res) => {
    db.collection('students').updateOne({_id:ObjectID(req.params.id)},{fname:req.body.fname, lname:req.body.lname}, function (err, result ) {
        if (err){
            console.log(err);
            res.sendStatus(500);
        }   
        res.sendStatus(200);
      })
   });

app.delete('/students/:id', (req,res) => {
    db.collection('students').deleteOne({_id:ObjectID(req.params.id)}, function (err, doc) {
      if (err){
          console.log(err);
          res.sendStatus(500);
      }   
      res.sendStatus(200);
    })
});

 MongoClient.connect('mongodb://localhost:27017/mydb', (err, database) => {
     if(err) throw err;
     db = database;
     app.listen(port,()=>{
        console.log(`server start on port ${port}`);
    })
 })
