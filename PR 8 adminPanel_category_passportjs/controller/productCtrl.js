const categoryModel = require('../model/categoryModel')
const subcategoryModel = require('../model/subcategoryModel')
const extraCategoryModel = require('../model/extraCategoryModel')
const productModel = require('../model/productModel')
const path = require('path')
const fs = require('fs')

module.exports.subcategoryDependent = async(req , res) => {
    try{
        // console.log(req.query.category)
        const subcategories = await subcategoryModel.find({category : req.query.category})
        return res.json({subcategories : subcategories , message : "Success"})

    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
}

module.exports.extraCategoryDependent = async(req , res) => {
    try{
        console.log(req.query.subcategory)
        const extraCategories = await extraCategoryModel.find({subcategory : req.query.subcategory})
        // console.log(extraCategories)
        return res.json({extraCategories : extraCategories , message : "success"})
    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
}

module.exports.addProductPage = async(req , res) => {
    try{
        // console.log("addProductPage")
        const category = await categoryModel.find({});
        const subcategory = await subcategoryModel.find({});
        const extraCategory = await extraCategoryModel.find({});
        // console.log(subcategory)
       
        return res.render('product/addProductPage',{
            category,subcategory,extraCategory
        })
    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
}

module.exports.addProduct = async(req , res) => {
    try{
        console.log(req.body)
        if(req.file){
            req.body.productImage = req.file.filename
            // console.log(req.file)
        }
         await productModel.create(req.body)
         return res.redirect('/product/viewProductPage')
    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
}

module.exports.viewProductPage = async(req , res) => {
    try{
        // console.log("viewProductPage")
        const allProduct = await productModel.find().populate('category').populate('subcategory').populate('extraCategory')
        // console.log(allProduct)
        return res.render('product/viewProductPage',{allProduct})
    }catch(err){
        console.log(err);
        return res.redirect('/admin')
    }
}

module.exports.viewSingleProductPage = async(req , res) => {
    try{
        const single = await productModel.findById(req.params.id).populate('category').populate('subcategory').populate('extraCategory')
        // console.log(single)
        return res.render('product/viewSingleProductPage',{single})
    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
}

module.exports.deleteProduct = async(req , res) => {
    try{
        console.log(req.params.id)
        const single = await productModel.findById(req.params.id)
        if(single){
            if(single.productImage){
                const oldPath = path.join(__dirname,'../uploads/productImage',single.productImage);
                console.log(oldPath)
                fs.unlinkSync(oldPath)
            }
            await productModel.findByIdAndDelete(req.params.id)
            console.log("Product Is Delete")
            return res.redirect('/product/viewProductPage')
        }else{
            console.log("There Is No Data Found Ny This Id!!")
        }
    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
}

module.exports.editProductPage = async(req , res) =>{
    try{
        console.log(req.params.id)
        const singleProduct = await productModel.findById(req.params.id).populate('category').populate('subcategory').populate('extraCategory')

        return res.render('product/editProductPage',{singleProduct})
    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
}

module.exports.editProduct = async(req , res) =>{
    try{
        // console.log("edit Id",req.params.id)
        const single = await productModel.findById(req.params.id)
        // console.log(single)
        console.log(req.body)
        if(single){
           if(req.file){
            if(single.productImage){
                const oldPath = path.join(__dirname,'../uploads/productImage',single.productImage)
                fs.unlinkSync(oldPath)
            }
            req.body.productImage = req.file.filename;
           }
           await productModel.findByIdAndUpdate(req.params.id , {productName : req.body.productName , description : req.body.description , price : req.body.price , productImage : req.body.productImage , quantity : req.body.quantity});
           console.log("Product Data Updated..")
        }else{
            console.log("There Is No Data By This Id !!")
        }
        return res.redirect("/product/viewProductPage")
    }catch(err){
        console.log(err)
        return res.redirect('/admin')
    }
}