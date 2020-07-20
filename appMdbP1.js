const express = require('express');
const bodyParser = require('body-parser');
const ObjectID  = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv').config();

const StudentsController = require('./controllers/students')
const port = process.env.PORT;

var db = require('./dbForP1/dbP1');

app = express();
//templates
app.set('view engine','hbs');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req,res) => {
      res.render('home');
});
//show list students
app.get('/students', StudentsController.all);
app.get('/students/:id', StudentsController.findById);
app.post('/students', StudentsController.create);
app.put('/students/:id', StudentsController.update);
app.delete('/students/:id', StudentsController.delete);

 db.connect('mongodb://localhost:27017/mydb', (err) => {
     if(err) throw err;
     app.listen(port,()=>{
        console.log(`server start on port ${port}`);
    })
 })
