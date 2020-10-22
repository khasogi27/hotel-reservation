const { User, Room, Booking } = require('../models')
const bcrypt = require("bcrypt")

class Controller {

  static home(req, res) {
    if(req.session.isLoggedIn === true) {
      res.render('home', {
        email: req.session.email,
        role : req.session.role
      });
    }
    else {
      res.redirect('/login');
    }
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
          console.log(result);
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
      console.log(err)
      res.send(err);
    });

  }

  static getSignUp(req, res) {
    res.render("signup")
  }

  static postSignUp(req, res) {
    const obj = {
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      password : req.body.password,
      no_hp : req.body.no_hp,
      email : req.body.email,
      role : 'user'
    }
    User.create(obj,{
      returning : true
    })
    .then(data => {
      res.redirect(`/signup?success=${data.first_name} ${data.last_name}`)
    })
    .catch(err=>{
      res.redirect(`/signup?err=${err}`)
    })
     
  }

  static getList(req, res) {
    if(req.session.isLoggedIn === true){
      Room.findAll()
        .then(data => {
          res.render('list', { data })
        })
        .catch(err => {
          res.send(err)
        })
    }
    else {
      res.redirect('/login');
    }
  }

  static getReserve(req, res) {
    const id = req.params.id
  }

  static postReserve(req, res) {
    const id = req.params.id
  }

  static getProfile(req, res) {
    console.log(req.session)
    res.render('profile')
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
  static logout(req,res){
    req.session.destroy(err => {
      if(err) {
        res.send(err);
      }
      res.redirect('/login');
    });
  }
}

module.exports = Controller