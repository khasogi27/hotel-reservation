const express = require('express')
const routes = require('./routers/index.js')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(routes)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
