import mongoose from "mongoose"

const messageSchema=new mongoose.Schema({
    title:{type:String, required:true, trim:true},
    content:{type:String, required:true, trim:true},
    author:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"user"}
},{timestamps:true})

const Message=mongoose.model("message", messageSchema)

export default Message