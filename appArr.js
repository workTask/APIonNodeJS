const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

app = express();

var db;

const port = process.env.PORT;
//templates
//app.set('view engine','ejs');
app.set('view engine','hbs');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const students = [ 
    {
        id:1,
        fname:'Vika',
        lname:'Fran'
    },
    {
        id:10,
        fname:'Fibi',
        lname:'Fr'
    },

];

app.get('/', (req,res) => {
      res.render('home');
});
// list students
app.get('/students', (req,res) => {
    res.send(students);
});
//student to id
app.get('/students/:id', (req,res) => {
    var numId = Number(req.params.id);
    var student = students.find(function(student){
        return student.id === numId;
    })
    res.send(student);
});

// added student
app.post('/students', (req,res) => {
    const student = {
        id:Date.now(),
        fname:req.body.fname,
        lname:req.body.lname
    }
    students.push(student); 
});

app.put('/students/:id', (req,res) => {
    var numId = Number(req.params.id);
    var student = students.find(function(student){
        return student.id === numId;
    })
    student.fname = req.body.fname;
    student.lname = req.body.lname;
    res.sendStatus(200);
});

app.delete('/students/:id', (req,res) => {
   var numId = Number(req.params.id);
   var student = students.filter(function(student){
       return student.id !== numId;
   })
    console.log(student);
    res.sendStatus(200)
});

app.listen(port,()=>{
    console.log(`server start on port ${port}`);
})

 


