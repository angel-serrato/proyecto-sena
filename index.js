import express from 'express'
import routes from './src/routes/routes.js'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import connectDB from './src/config/database.js'
import dotenv from 'dotenv'
import loginRouter from './src/config/login.js'
import session from 'express-session'

const port = process.env.PORT || 3000
const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

dotenv.config()
connectDB()

app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'src', 'views'))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(express.json())
app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(loginRouter)
app.use(routes)

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})