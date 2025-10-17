const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017')

const db = mongoose.connection

db.once('open',(err)=>{
  if(err){
    console.log(err);
    
  }
  console.log("db is connected");
  
})

// module.exports = db;  

// if we comment this line still db is connected is shown in console screen then why we write this module.exports = db; ????

