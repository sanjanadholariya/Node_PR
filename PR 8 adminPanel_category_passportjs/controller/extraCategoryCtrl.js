const categoryModel = require("../model/categoryModel");
const subcategoryModel = require("../model/subcategoryModel");
const extraCategoryModel = require("../model/extraCategoryModel");
const extraCategory = require("../model/extraCategoryModel");
const productModel = require('../model/productModel')

module.exports.addExtraCategoryPage = async (req, res) => {
  try {
    console.log("addExtraCategoryPage");
    const category = await categoryModel.find();
    const subcategory = await subcategoryModel.find();
    return res.render("extraCategory/addExtraCategoryPage", {
      category,
      subcategory,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

// API for dependent dropdown in add extra category page 
// that is work for dependency of subcategory on category 

module.exports.extraSubCategoryDropdown = async(req , res) => {
  try{
    console.log(req.query.category)
    const subcategory = await subcategoryModel.find({category : req.query.category});
    // console.log(subcategory)

    return res.json({subcategories:subcategory , message:"success"})

  }catch(err){
    console.log(err)
    return res.redirect('/admin')
  }
}

module.exports.addExtraCategory = async (req, res) => {
  try {
    // console.log(req.body);
    await extraCategoryModel.create(req.body);
    return res.redirect("/extraCategory/viewExtraCategoryPage");
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.viewExtraCategoryPage = async (req, res) => {
  try {
    const extraCategory = await extraCategoryModel
      .find()
      .populate("category")
      .populate("subcategory");
      // console.log(extraCategory);
    return res.render("extraCategory/viewExtraCategory", { extraCategory });
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.deleteExtraCategory = async (req, res) => {
  try {
    console.log(req.params.id);
    await extraCategoryModel.findByIdAndDelete(req.params.id);
    await productModel.deleteMany({extraCategory : req.params.id})
    return res.redirect("/extraCategory/viewExtraCategoryPage");
  } catch (err) {
    console.log(err);
    return res.redirect("/admin");
  }
};

module.exports.editExtraCategoryPage = async(req , res) => {
    try{
        console.log(req.params.id)

        const single = await extraCategoryModel.findById(req.params.id).populate('category').populate('subcategory')
        return res.render('extraCategory/editExtraCategory',{single})

        // console.log(single);
        
    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
}

module.exports.editExtraCategory = async(req , res)=> {
    try{    
        console.log(req.body)
        await extraCategoryModel.findByIdAndUpdate(req.params.id , {extraCategory : req.body.extraCategory})
        return res.redirect('/extraCategory/viewExtraCategoryPage')
    }catch(err){
        console.log(err)
        return req.redirect('/admin')
    }
}