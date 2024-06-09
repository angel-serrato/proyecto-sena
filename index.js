const express = require('express')
const routes = require('./src/routes/routes.js')
const app = express()
const path = require('path')
const connectDB = require('./src/config/database.js')
const dotenv = require('dotenv')
const port = process.env.PORT

dotenv.config()

connectDB()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src', 'views'));

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(routes)

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})