import express from "express"
import Message from "../models/Message.js"

const messageRouter=express.Router()

messageRouter.get("/",async (req,res,next)=>{
    try {
        const messages=await Message.find()
        res.send(messages)
    } catch (error) {
        next({
            status:400,
            message:"invalid Operation",
            originalError:error
        })
    }
})

messageRouter.post("/",async (req,res,next)=>{
    try{
        req.body.author=req.user._id
        const message=await Message.create(req.body)
        res.send({deleted:true})
    }
    catch(error){
        next({
            status:400,
            message:error.message,
            originalError:error
        })
    }
})

messageRouter.delete("/:messageId", async (req,res,next)=>{
    try {
        const result=await Message.findByIdAndRemove(req.params.messageId)
        res.send(result)
    } catch (error) {
        next({
            status:400,
            message:"Operation failed",
            originalError:error
        })
    }
})

export default messageRouter