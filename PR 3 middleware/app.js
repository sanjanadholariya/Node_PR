const express = require('express');

const app = express();

const port = 8001;

const db = require('./config/db')

app.set("view engine","ejs");

const middleware = (req, res, next) => {
  if(req.query.age>=18){
    return next();
  }
  else{
    return res.redirect('/')
  }
}

app.get('/',(req,res)=>{
  return res.render('home')
})

app.get('/contact',middleware,(req,res)=>{
  return res.render('contact')
})

app.get('/product',middleware,(req,res)=>{
  return res.render('product')
})

app.listen(port,(err)=>{
  if(err){
    console.log(err); 
  }
  console.log(`server is start on http://localhost:${port}`);
})