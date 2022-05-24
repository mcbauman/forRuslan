export default function requestlogger(req,res,next){
    console.log("R"+ req.method+" "+req.url)
    next()
}