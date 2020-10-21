const { User, Room, Booking } = require('../models')

class Controller {

  static home(req, res) {
    res.render('home')
  }

  static getLogin(req, res) {

  }

  static postLogin(req, res) {

  }

  static getSignUp(req, res) {

  }

  static postSignUp(req, res) {

  }

  static getList(req, res) {
    Room.findAll()
      .then(data => {
        res.render('list', { data })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static getReserve(req, res) {
    const id = req.params.id
  }

  static postReserve(req, res) {
    const id = req.params.id
  }

  static getProfile(req, res) {
    const email = req.params.email
  }

  static getPay(req, res) {
    const id = req.params.id
  }

  static getCheckin(req, res) {
    const id = req.params.id
  }

  static getCancel(req, res) {
    const id = req.params.id
  }
}

module.exports = Controller