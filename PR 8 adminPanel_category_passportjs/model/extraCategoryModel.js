const mongoose = require('mongoose');
const category = require('./categoryModel');
const subcategory = require('./subcategoryModel');

const extraCategorySchema = mongoose.Schema({
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : category
    },
    subcategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : subcategory
    },
    extraCategory : {
        type : String
    }
})

const extraCategory = mongoose.model('extraCategory',extraCategorySchema)

module.exports = extraCategory