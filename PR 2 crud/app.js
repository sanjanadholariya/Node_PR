const express = require('express')

const port = 8001;

const app = express();

const db = require('./config/db')

const crudModel = require('./model/crudModel')

app.set('view engine','ejs')
app.use(express.urlencoded())

app.get('/',async(req,res)=>{
   const allData = await crudModel.find()
  // console.log(allData);
  
  return res.render('viewData',{
    allData
  })
})

app.get('/addData',(req,res)=>{
  return res.render('addData')
})

app.post('/goToDatabase',async(req,res)=>{
  try{
    console.log(req.body);

  
  
  await crudModel.create(req.body)
  return res.redirect('/')
  }catch(err){
    console.log(err);
    return res.redirect('/')
    
  }
  
})



app.get('/deleteData',async(req,res)=>{
  console.log(req.query.id);
  await crudModel.findByIdAndDelete(req.query.id)
  return res.redirect('/')
  
})

app.get('/editData/:id',async(req,res)=>{
  console.log(req.params.id);
  let single = await crudModel.findById(req.params.id)
  console.log(single);
  
  return res.render('edit',{
    single
  })
  
})

app.post('/editObject/:id',async(req,res)=>{
  console.log(req.body);
  await crudModel.findByIdAndUpdate(req.params.id , req.body)

  return res.redirect('/');
  
})

app.listen(port , (err)=>{
  if(err){
    console.log(err);
    return;
  }
  console.log("server is connected...");
  
})