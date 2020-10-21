function isLogin(ejs){
    if(req.session.isLoggedIn === true) {
        res.render(ejs, {
          email: req.session.email,
          id : req.session.id,
          role : req.session.role
        });
      }
      else {
        res.redirect('/login');
      }
}
module.exports = isLogin