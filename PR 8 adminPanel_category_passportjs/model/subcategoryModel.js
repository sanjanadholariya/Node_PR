const mongoose = require('mongoose');
const category = require('./categoryModel');

const subCategorySchema = mongoose.Schema({
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : category
    },
    subcategory : String
})

const subcategory = mongoose.model('subcategory',subCategorySchema);

module.exports = subcategory