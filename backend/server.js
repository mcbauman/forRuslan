import express from "express"
import connect from "./lib/database.js"
import cors from "cors"
import dotenv from "dotenv"

import requestlogger from "./requstlogger.js"
import checkAuth from "./checkAuth.js"
import userRouter from "./routes/userRouter.js"
import messageRouter from "./routes/messageRouter.js"


dotenv.config()
connect()
const app=express()
app.use(cors())
app.use(express.json())
app.use(requestlogger)

//Endpoints
app.use("/api/v1/users", userRouter)
app.use("/api/v1/messages", checkAuth, messageRouter)

//If no other Endpoint
app.use((req,res,next)=>{
    next({status:404, message:"Endpoint dont exsist"})
})

//Global ERROR Handler
app.use((err,req,res,next)=>{
    console.log("GlobError",err);
    res.status(err.status||500).send({
        error:err.message||"something went wrong"
    })
})

app.listen(process.env.PORT||5000,()=>console.log("Server up at",process.env.PORT))