const routes = require('express').Router()
const Controller = require('../controllers/controller.js')
const middleware = require("../middleware/middleware")

routes.get('/', middleware.isLogin,Controller.home)
routes.get('/login',middleware.isLogout, Controller.getLogin)
routes.post('/login', Controller.postLogin)
routes.get('/signup',middleware.isLogout, Controller.getSignUp)
routes.post('/signup', Controller.postSignUp)
routes.get('/list', middleware.isLogin,Controller.getList)
routes.get('/reserve/:id', middleware.isLogin,Controller.getReserve)
routes.post('/reserve/:id', Controller.postReserve)
routes.get('/profile', middleware.isLogin,Controller.getProfile)
routes.get('/profile/pay/:id', middleware.isLogin,Controller.getPay)
routes.get('/profile/checkin/:id', middleware.isLogin,Controller.getCheckin)
routes.get('/profile/cancel/:id', middleware.isLogin,Controller.getCancel)
routes.get('/logout', middleware.isLogin,Controller.logout)



module.exports = routes
