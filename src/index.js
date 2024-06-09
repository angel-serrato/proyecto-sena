import express from 'express'
import routes from './routes/routes.js'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/database.js'
import dotenv from 'dotenv'
import loginRouter from './config/login.js'

const port = process.env.PORT
const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

dotenv.config()
connectDB()

app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'))

app.use(loginRouter)
app.use(routes)
app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})