const express = require('express');
const routes = express.Router()
const libraryController = require('../controller/libraryController')
const libraryModel = require('../model/libraryModel')

routes.get('/',libraryController.viewBook)
routes.get('/add',libraryController.add)
routes.post('/addBook',libraryModel.imageUpload,libraryController.addBook)
routes.get('/deleteBook/:id',libraryController.deleteBook)
routes.get('/editBook/:id',libraryController.edit)
routes.post('/update/:id',libraryModel.imageUpload, libraryController.update)
routes.get('/singleBook/:id',libraryModel.imageUpload,libraryController.singleBook)

module.exports = routes;