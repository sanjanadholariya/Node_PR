const express = require('express')

const routes = express.Router()

const categoryCtrl = require('../controller/categoryCtrl')

const categoryModel = require('../model/categoryModel')
const { deleteBlog } = require('../controller/adminCtrl')


routes.get('/addCategoryPage',categoryCtrl.addCategoryPage)
routes.post('/addCategory',categoryModel.imageUpload,categoryCtrl.addCategory)
routes.get('/viewCategoryPage',categoryCtrl.viewCategoryPage)
routes.get('/deleteCategory/:id',categoryCtrl.deleteCategory)
routes.get('/editCategoryPage/:id',categoryCtrl.editCategoryPage)
routes.post('/editCategory/:id',categoryModel.imageUpload,categoryCtrl.editCategory)

module.exports = routes