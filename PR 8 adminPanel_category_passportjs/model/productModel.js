const mongoose = require('mongoose')
const multer = require('multer')

const path = require('path')
const category = require('./categoryModel')
const subcategory = require('./subcategoryModel')
const extraCategory = require('./extraCategoryModel')

const productSchema = mongoose.Schema({
    productName : String,
    description : String,
    price : Number,
    quantity : Number,
    productImage : String,
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : category
    },
    subcategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : subcategory
    },
    extraCategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : extraCategory
    }
})

const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , path.join(__dirname,'../uploads/productImage'))
    },
    filename : (req , file , cb) => {
        cb(null , `${file.fieldname}-${Date.now()}`)
    }
})

productSchema.statics.productImageUpload = multer({storage : storage}).single('productImage')

const productModel = mongoose.model('product',productSchema);

module.exports = productModel;