const express = require('express')
const productModel = require('../model/productModel')
const routes = express.Router()
const { addProductPage, addProduct, viewProductPage, viewSingleProductPage, deleteProduct, editProductPage, editProduct, subcategoryDependent, extraCategoryDependent } = require('../controller/productCtrl');
const passport = require('passport');
const extraCategory = require('../model/extraCategoryModel');

routes.get('/addProductPage',addProductPage)
routes.get('/subcategory',subcategoryDependent)
routes.get('/extraCategory',extraCategoryDependent)
routes.post('/addProduct',productModel.productImageUpload,addProduct)
routes.get('/viewProductPage',productModel.productImageUpload,viewProductPage)
routes.get('/viewSingleProductPage/:id',productModel.productImageUpload,viewSingleProductPage)
routes.get('/deleteProduct/:id',deleteProduct)
routes.get('/editProductPage/:id',productModel.productImageUpload,editProductPage)
routes.post('/editProduct/:id',productModel.productImageUpload,editProduct)

module.exports = routes;