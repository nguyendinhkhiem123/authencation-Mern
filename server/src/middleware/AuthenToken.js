const jwt = require('jsonwebtoken');


const verifyToken = async (req , res , next) =>{
    const authorHeader = req.headers['authorization'];
  
    const token = authorHeader && authorHeader.split(" ")[1];

    if(!token) return res.status(400).json({
        success : false,
        message : "Token không tồn tạj"    
    });

    try{
        const verify = await jwt.verify(token , process.env.TOKEN_ACCESS_KEY);
        next();
    }
    catch(err){
        
        if(err.name === "JsonWebTokenError")  return res.sendStatus(400)
        return res.sendStatus(401);
    }
}

module.exports = verifyToken;