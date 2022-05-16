//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const Schema = require('./models/schema.js')
const architectureSeed = require('./models/architecture.js')
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, () => {
    console.log('connected to mongo')
});


//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000
// app.get('/' , (req, res) => {
//   res.send('Hello World!');
// });

// 7. put
app.put('/architecture/:id', (req,res) => {
    Schema.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updatedModel) => {
      res.redirect('/architecture')
    })
  })
  
  // 3. new 
  app.get('/architecture/new', (req,res) => {
    res.render('new.ejs', {
        tabTitle: 'add new'
    })
})
  
  // 4. post
  app.post('/architecture', (req,res) => {
    Schema.create(req.body, (err, createdSchema) => {
      res.redirect('/architecture')
    })
  })
  
  // 5. delete
  app.delete('/architecture/:id', (req,res) => {
    Schema.findByIdAndRemove(req.params.id, (err,data) => {
      res.redirect('/architecture')
    })
  })
  
  // 6. edit
  app.get('/architecture/:id/edit', (req,res) => {
    Schema.findById(req.params.id, (err, foundArchitecture) => {
      res.render('edit.ejs', {
        tabTitle: 'edit architecture',
        architecture: foundArchitecture
      })
    })
  })

//00. seed data
// app.get('/architecture/seed', (req, res) => {
//     Schema.create(architectureSeed, (err, seedData) => {
//         console.log(seedData)
//   res.redirect('/architecture')
// })
// })



//2. show
app.get('/architecture/:id', (req,res) => {
    Schema.findById(req.params.id, (err,foundArchitecture) => {
      res.render('show.ejs', {
        tabTitle: 'architecture details',
        architecture: foundArchitecture
      })
    })
  })

//1. index
app.get('/architecture', (req, res)=>{
    Schema.find({}, (err, allArchitecture) => {
        res.render('index.ejs', {
            tabTitle: 'Home',
            // res.send('index.ejs');
        architecture: allArchitecture
        });
    });
 });

 // Error / success
// db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
// db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
// db.on('disconnected', () => console.log('mongo disconnected'));
        

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));