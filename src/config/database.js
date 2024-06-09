import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CLUSTER)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(`Failed to connect ${error}`)
    }
}

export default connectDB;