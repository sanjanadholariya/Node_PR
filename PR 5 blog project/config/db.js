const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://sanjana:sanjana123@cluster0.j5x75l5.mongodb.net/blog')

const db = mongoose.connection;

db.once('open',(err)=>{
  if(err){
    console.log(err);
    return ;
    
  }
  console.log("DB os connected...");
  
})

module.exports = db;

