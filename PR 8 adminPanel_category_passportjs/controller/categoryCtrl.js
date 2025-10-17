
const categoryModel = require('../model/categoryModel')
const subcategoryModel = require('../model/subcategoryModel')
const extraCategoryModel = require('../model/extraCategoryModel')
const productModel = require('../model/productModel')
const fs = require('fs')
const path = require('path')


module.exports.addCategoryPage = async(req , res) => {
  try{
    return res.render('category/addCategoryPage')
  }catch(err){
    console.log(err);
    return res.redirect('/admin')
    
  }
}

module.exports.addCategory = async(req , res) => {
  try{
    if(req.file){
      req.body.categoryImage = req.file.filename
    }
    console.log(req.body.title)
    await categoryModel.create(req.body);
    return res.redirect('/category/viewCategoryPage')
  }catch(err){
    console.log(err);
    return res.redirect('/admin')
    
  }
}

module.exports.viewCategoryPage = async(req , res) => {
  try{
    
   var search = "";
    if (req.query.search) {
      search = req.query.search
    }
    var data = await categoryModel.find({
      $or: [
        {
          title: { $regex: search, $options: 'i' }
        }
      ]
    })

    if(req.query.reset){
      data = await categoryModel.find({})
    }
    return res.render('category/viewCategoryPage',{data})
  }catch(err){
    console.log(err);
    return res.redirect('/admin')
    
  }
}

module.exports.deleteCategory = async(req , res) => {
  try{
    // console.log(req.params.id);
    const single = await categoryModel.findById(req.params.id)
    if(single.categoryImage){
      fs.unlinkSync(path.join(__dirname , '../uploads/categoryImage/', single.categoryImage))
    }
    await categoryModel.findByIdAndDelete(req.params.id)
    await subcategoryModel.deleteMany({category : req.params.id})
    await extraCategoryModel.deleteMany({category : req.params.id})
    await productModel.deleteMany({category : req.params.id})
    return res.redirect('/category/viewCategoryPage')
    
  }catch(err){
    console.log(err);
    return res.redirect('/admin')
    
  }
}

module.exports.editCategoryPage = async(req , res) => {
  try{
    console.log(req.params.id)
    const single = await categoryModel.findById(req.params.id)
    console.log(single)

    return res.render('category/editCategoryPage',{single})
  }catch(err){
    console.log(err)
    return res.redirect('/admin')
  }
}

module.exports.editCategory = async(req ,res) => {
  try{
    console.log(req.params.id);
    const single = await categoryModel.findById(req.params.id)
    console.log(single);

    if(req.file){
      if(single.categoryImage){
        fs.unlinkSync(path.join(__dirname , '../uploads/categoryImage/', single.categoryImage))
        req.body.categoryImage = req.file.filename
      }else{
        req.body.categoryImage = req.file.filename
      }
    }
    console.log(req.body)
    await categoryModel.findByIdAndUpdate(req.params.id,req.body)
    return res.redirect('/category/viewCategoryPage')
  }catch(err){
    console.log(err);
    return res.redirect('/admin')
    
  }
}