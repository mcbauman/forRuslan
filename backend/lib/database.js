import mongoose from "mongoose"

export default function connect(){
    mongoose.connection.on("connecting",()=>console.log("M connecting"))
    mongoose.connection.on("connected",()=>console.log("M connected"))
    mongoose.connection.on("disconnected",()=>console.log("M disconnected"))
    mongoose.connection.on("reconnected",()=>console.log("M reconnected"))
    mongoose.connection.on("error",()=>console.log("M error"))

    const {DB_USER, DB_PASS, DB_HOST, DB_NAME}=process.env
    const cs=`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`
    console.log(cs);
    return mongoose.connect(cs)
}