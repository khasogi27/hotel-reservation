exports.isLogin = (req,res,next) => {
    if(req.session.isLoggedIn === true) {
        next()
      }
      else {
        res.redirect('/login');
      }
}
exports.isLogout = (req,res,next) => {
  if(!req.session.isLoggedIn) {
      next()
    }
    else {
      res.redirect('/');
    }
}
