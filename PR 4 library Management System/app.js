const express = require('express')
const app = express()
const port = 8001;

const path = require('path')

const db = require('./config/db')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))



app.set('view engine','ejs')

app.use(express.urlencoded())

app.use('/',require('./routing/index'))

app.listen(port , (err)=>{
  if(err){
    console.log(err);
    return false;
    
  }
  console.log("server is running...");
  
})