const express = require('express')

const routes = express.Router();

const subcategoryModel = require('../model/subcategoryModel');
const { addSubCategoryPage, addSubcategory, viewSubcategoryPage, deleteSubcategory, editSubcategoryPage, editSubcategory } = require('../controller/subcategoryCtrl');

routes.get('/addSubCategoryPage',addSubCategoryPage)
routes.post('/addSubcategory',addSubcategory)
routes.get('/viewSubcategoryPage',viewSubcategoryPage)
routes.get('/deleteSubcategory/:id', deleteSubcategory)
routes.get('/editSubcategoryPage/:id',editSubcategoryPage)
routes.post('/editSubcategory/:id',editSubcategory)
module.exports = routes;