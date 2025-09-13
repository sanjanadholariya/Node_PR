const libraryModel = require('../model/libraryModel')
const fs = require('fs')
const path = require('path')


module.exports.add = (req,res)=>{
  return res.render('addBook')
}

module.exports.addBook = async(req,res) =>{
  console.log(req.file);
  req.body.isbn = Math.floor(Math.random()*1000000000000)
  if(req.file){
    req.body.image ='/uploads/' + req.file.filename
  }
  await libraryModel.create(req.body)
  return res.redirect('/')
  
}

module.exports.viewBook = async (req,res) => {
  const allBook = await libraryModel.find()
  return res.render('viewBook',{
    allBook
  })
}

module.exports.deleteBook = async(req,res) => {
  const single =await libraryModel.findById(req.params.id)
  if(single.image){
    fs.unlinkSync(path.join(__dirname,'..',single.image))
  }
  await libraryModel.findByIdAndDelete(req.params.id)
  return res.redirect('/')
}

module.exports.edit = async(req,res) => {
  const single = await libraryModel.findById(req.params.id)
  return res.render('editBook',{
    single
  })
}

module.exports.update = async(req,res) => {
  const single = await libraryModel.findById(req.params.id)
  if(req.file){
    if(single.image){
      fs.unlinkSync(path.join(__dirname,'..',single.image))
    }
    req.body.image = '/uploads/' + req.file.filename
  }
  else{
    req.body.image = single.image
  }
  await libraryModel.findByIdAndUpdate(req.params.id , req.body)
  return res.redirect('/')
}

module.exports.singleBook = async(req,res) => {
  const single =await libraryModel.findById(req.params.id)
  console.log(single);
  
  return res.render('singleBook',{
    single
  })
}