const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(`Failed to connect ${error}`)
    }
}

module.exports = connectDB;