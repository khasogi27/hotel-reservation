const express = require('express')
const routes = require('./routers/index.js')
const session = require('express-session');
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(session({
  // Secret adalah kunci untuk menggunakan session, REQUIRED
  // anggap saja seperti password nya session
  secret: "manadimanaanakkambingsaya",
  // Baca dokumentasi untuk mengetahui lebih lanjut
  resave: false,
  // Baca dokumentasi untuk mengetahui lebih lanjut
  saveUninitialized: false,
}));
app.use(express.urlencoded({ extended: false }))
app.use(routes)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
