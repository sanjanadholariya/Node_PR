const express = require('express')

const port = 8010;

const app = express();

const db = require('./config/db')

const path = require('path')

const blogModel = require('./model/blogMode');
const blog = require('./model/blogMode');
app.use('/uploads',express.static(path.join(__dirname,'uploads')))


app.use(express.urlencoded())
app.set('view engine' , 'ejs')
app.use(express.static(path.join(__dirname,'public')))


app.get('/add',(req,res)=>{
  return res.render('add')
})

app.post('/addBlog' ,blogModel.imageUpload,async (req,res) => {
  // console.log(req.body);
  // console.log(req.file);
  if(req.file){
    req.body.image = '/uploads/' + req.file.filename
  }
  
  await blogModel.create(req.body);
  return res.redirect('/')

  
})

app.get('/',async(req,res)=>{
  const allBlog = await blogModel.find()
  return res.render('view',{
    allBlog
  })
})

app.get('/viewMore/:id',async(req,res)=>{
  // console.log(req.params.id);
  const single =await blogModel.findById(req.params.id)
  // console.log(single);
  return res.render('viewSingle',{
    single
  })
  
  
})

app.listen(port , (err)=>{
  if(err){
    console.log(err);
    return false;
    
  }
  console.log("server is running....");
  
})