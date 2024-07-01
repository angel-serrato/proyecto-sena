import express from 'express'
import routes from './routes/routes.js'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/database.js'
import dotenv from 'dotenv'
import loginRouter from './config/login.js'
import session from 'express-session'
import errorHandler from './middleware/errorHandler.js'
import authRouter from './routes/auth.js'
import productRoutes from './routes/product.js'


const port = process.env.PORT || 5000
const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

dotenv.config()
connectDB()

app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    // Session timeout of 60 seconds
    cookie: {
        maxAge: 60000
    }
}))

app.use(express.json())
app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(loginRouter)
app.use(routes)
app.use(errorHandler)
app.use('/auth', authRouter)
app.use('/products', productRoutes)

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})