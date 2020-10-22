const routes = require('express').Router()
const Controller = require('../controllers/controller.js')

routes.get('/', Controller.home)
routes.get('/login', Controller.getLogin)
routes.post('/login', Controller.postLogin)
routes.get('/signup', Controller.getSignUp)
routes.post('/signup', Controller.postSignUp)
routes.get('/list', Controller.getList)
routes.get('/reserve/:id', Controller.getReserve)
routes.post('/reserve/:id', Controller.postReserve)
routes.get('/profile', Controller.getProfile)
routes.get('/profile/pay/:id', Controller.getPay)
routes.get('/profile/checkin/:id', Controller.getCheckin)
routes.get('/profile/cancel/:id', Controller.getCancel)
routes.get('/logout', Controller.logout)



module.exports = routes
