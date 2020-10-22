const { User, Room, Booking } = require('../models')
const bcrypt = require("bcrypt")
const QRCode = require('qrcode')
const getFullDate = require("../helper/getFullDate")
const calculatePrice = require("../helper/calculatePrice")

class Controller {

  static home(req, res) {
    res.render('home', {
      email: req.session.email,
      role: req.session.role
    });
  }

  static getLogin(req, res) {
    res.render("login")
  }

  static postLogin(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(data => {
        if (data === null) {
          res.redirect('/login?err=true');
        }
        else {
          bcrypt.compare(req.body.password, data.password)
            .then(result => {
              if (result) {
                req.session.isLoggedIn = true;
                req.session.email = data.email;
                res.redirect('/');
              } else {
                res.redirect('/login?err=true');
              }
            })
        }
      })
      .catch(err => {
        res.send(err);
      });

  }

  static getSignUp(req, res) {
    res.render("signup")
  }

  static postSignUp(req, res) {
    const obj = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      no_hp: req.body.no_hp,
      email: req.body.email,
      role: 'user'
    }
    User.create(obj, {
      returning: true
    })
      .then(data => {
        res.redirect(`/signup?success=${data.first_name} ${data.last_name}`)
      })
      .catch(err => {
        res.redirect(`/signup?err=${err}`)
      })

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
    Room.findByPk(id)
      .then(data => {
        res.render('reserve', { data })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static postReserve(req, res) {
    const { id } = req.params
    const { start_date, end_date } = req.body
    Room.findByPk(id)
      .then(data => {
        data.available--
        const obj = {
          available: data.available
        }
        return Room.update(obj, { where: { id } })
      })
      .then(() => {
        return User.findAll({
          where: {
            email: req.session.email
          }
        })
      })
      .then(data => {
        const UserId = data[0].id
        const obj = {
          start_date,
          end_date,
          status: 'reserve',
          RoomId: id,
          UserId
        }
        return Booking.create(obj)
      })
      .then(() => {
        res.redirect('/profile')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static getProfile(req, res) {
    User.findOne({
      where: {
        email: req.session.email,
      },

    })
      .then(data => {
        // const room = data.Rooms
        //   return Booking.findAll({
        //     where: {
        //       UserId: data.id
        //     }
        //   })
        // })
        // .then(data => {
        res.render('profile', { data })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static getOrder(req, res) {
    let UserId
    User.findOne({
      where: {
        email: req.session.email
      }
    })
      .then(data => {
        UserId = data.id
        return Booking.findAll({
          where: {
            UserId
          },
          include: Room
        })
      })
      .then(data => {
        res.render('order', { data, getFullDate, calculatePrice })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static getPay(req, res) {
    const id = req.params.id
    const hash = bcrypt.hashSync(id, 12);
    const obj = { status: 'paid', qrkey: hash }
    Booking.update(obj, { where: { id } })
      .then(() => {
        res.redirect('/order')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static getCheckin(req, res) {
    const id = req.params.id
    console.log(id)
    Booking.findByPk(id)
      .then(data => {
        console.log(data)
        return QRCode.toDataURL(data.qrkey)
      })
      .then(url => {
        console.log(url)
        res.render("showqr", { url })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static getCancel(req, res) {
    const id = req.params.id
    Booking.findOne({
      where: {
        id
      },
      include: Room
    })
      .then(data => {
        data.Room.available++
        const obj = {
          available: data.Room.available
        }
        return Room.update(obj, {
          where: {
            id: data.Room.id
          }
        })
          .then(data => {
            return Booking.destroy({
              where: {
                id
              }
            })
          })
      })
      .then(data => {
        res.redirect('/order')
      })
      .catch(err => {
        res.render(err)
      })

  }
  static logout(req, res) {
    req.session.destroy(err => {
      if (err) {
        res.send(err);
      }
      res.redirect('/login');
    });
  }
}

module.exports = Controller