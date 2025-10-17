const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/PR_2_crud')

const db = mongoose.connection;

db.once('open',(err)=>{
  err ? console.log(err) : console.log("DB is connected...");
  ;
  
})

module.exports = db;
