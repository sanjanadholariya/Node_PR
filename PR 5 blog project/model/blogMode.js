const mongoose = require('mongoose')
const multer = require('multer')
const uploads = '/uploads'
const path = require('path')

const blogSchema = mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  type : {
    type : Array,
    required : true
  },
  image : {
    type : String,
    required : true
  }
})

const storage = multer.diskStorage({
  destination : (req,file,cb) => {
    cb(null,path.join(__dirname , '..' + uploads))
  },
  filename : (req,file,cb) =>{
    cb(null,file.fieldname+'-'+Date.now())
  }
})

blogSchema.statics.imageUpload = multer({storage : storage}).single('image')
const blog = mongoose.model('blog',blogSchema)

module.exports = blog