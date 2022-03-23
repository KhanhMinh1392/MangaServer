const JWT = require('jsonwebtoken')

const middleware = {
    // const authorHeader= req.headers.authorHeader;
    // const token= authorHeader.split(' ')[1];
    // if(!token)  res.status(401).json("Not authenticated")

    // JWT.verify(token,"ApiManga",(err,data)=>{

    // })
    verifyToken:(req,res,next)=>{
        const token = req.headers.token;
       
        if(token){
            const accestoken = token.split(" ")[1];
            JWT.verify(accestoken,"ApiManga",(err,user)=>{
                if(err){
                   return res.status(403).json("Token is not valid")
                }
                req.user = user;
                next();
            })
        }
        else{
            return res.status(401).json("Not authenticated")
        }
    }
}
module.exports=middleware;