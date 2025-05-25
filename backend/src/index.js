import express from "express"
import authRouter from "./routes/auth.route.js"
import {connectDB} from "./lib/db.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import messageRouter from "./routes/message.route.js"
import cors from "cors"
import bodyParser from "body-parser"
import {server, io, app} from "../src/lib/socket.js"

import path from "path"


const PORT = process.env.PORT
const _dirname = path.resolve()

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/messages",messageRouter)

dotenv.config()

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname,"../frontend/dist")))
    app.get("*",(req,res) => {
        res.sendFile(path.join(_dirname,"../frontend","dist","index.html"))
    })
}

server.listen(PORT, () => {
    console.log('server is running at 5001')
    connectDB();
})