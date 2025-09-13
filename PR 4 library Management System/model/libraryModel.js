const mongoose = require('mongoose')
const multer = require('multer')
const uploads = 'uploads'
const path = require('path')

const librarySchema = mongoose.Schema({
  title :{
    type : String,
    required : true
  },
  author :{
    type : String,
    required : true
  },
  genre :{
    type : Array,
    required : true
  },
  total : {
    type : Number,
    required : true
  },
  isbn : {
    type : Number,
    required : true

  },
  description :{
    type : String,
    required : true
  },
  image :{
    type : String,
    required : true
  }
})

const storage = multer.diskStorage({
  destination : (req,file,cb) =>{
    cb(null,path.join(__dirname,'..' , uploads))
  },
  filename : (req,file,cb) => {
    cb(null, file.fieldname+'-'+Date.now())
  }
})

librarySchema.statics.imageUpload = multer({storage : storage}).single('image')

const library = mongoose.model('library',librarySchema)
module.exports = library