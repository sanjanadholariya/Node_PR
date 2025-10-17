const express = require('express')
const { login, loginUser, logoutUser, forgotPassword, sendMailWithOTP, checkOtpPage, verifyOtp, resetPasswordPage, resetPassword, changePasswordPage, changePassword } = require('../controller/indexCtrl')
const passport = require('../config/middleware/localStrategy')


const routes = express.Router()

routes.get('/',login)
routes.post('/loginUser',passport.authenticate('local' , {failureRedirect : '/'}),loginUser)
routes.get('/logoutUser',logoutUser)
routes.get('/forgotPassword',forgotPassword)
routes.post('/sendMailWithOTP',sendMailWithOTP)
routes.get('/checkOtpPage',checkOtpPage)
routes.post('/verifyOtp',verifyOtp)
routes.get('/resetPasswordPage',resetPasswordPage)
routes.post('/resetPassword',resetPassword)

routes.use('/admin',passport.checkAdmin,require('./adminRoutes'))
routes.use('/category',passport.checkAdmin,require('./categoryRoutes'))
routes.use('/subcategory',passport.checkAdmin,require('./subcategoryRoutes'))
routes.use('/extraCategory',passport.checkAdmin,require('./extraCategoryRoutes'))
routes.use('/product',passport.checkAdmin,require('./productRoutes'))
routes.use('/website',require('./webRoutes'))

module.exports = routes