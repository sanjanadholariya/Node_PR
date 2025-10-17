const mongoose = require('mongoose')
const multer = require('multer')
const imagePath = '/uploads/categoryImage';
const path = require('path')

const categorySchema = mongoose.Schema({
    title : String ,
    categoryImage : String
})

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,path.join(__dirname , ".." , imagePath))
    },
    filename : (req , file , cb)=> {
        cb(null , file.fieldname + "-" + Date.now())
    }
})

categorySchema.statics.imageUpload = multer({storage : storage}).single('categoryImage');

const category = mongoose.model('category',categorySchema)

module.exports = category