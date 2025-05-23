import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
export const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongonDB connected: ${conn.connection.host}`)
        } catch(error){
            console.log('MogonDB connect unsuccessfully',error)
         }
 }