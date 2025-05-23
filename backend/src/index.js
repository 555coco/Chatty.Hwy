import express from "express"
import authRouter from "./routes/auth.route.js"
import {connectDB} from "./lib/db.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import messageRouter from "./routes/message.route.js"
import cors from "cors"
import bodyParser from "body-parser"


const app = express()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/messages",messageRouter)

dotenv.config()


app.listen(5001, () => {
    console.log('server is running at 5001')
    connectDB();
})