const userModel = require('../model/UserModel');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
/*
    method : POST
    url : /auth/login

*/
const login = async ( req , res )=>{
    try{
        const user = await userModel.findOne({ username : req.body.username })
        
        if(!user) return res.json({
            successs : false ,
            message : ' Sai tài khoản không tồn tại '
        }); 

        const confirmPassword = await argon2.verify(user.password , req.body.password);

        if(!confirmPassword) return res.json({
            successs : false ,
            message : ' Mật khẩu không đúng '
        }); 

        const tokenAccess = jwt.sign({
            user_id :  user._id
        }, 
            process.env.TOKEN_ACCESS_KEY,
            { expiresIn: '20s' }
        );
        const tokenRefresh = jwt.sign({
            user_id :  user._id
        }, 
            process.env.TOKEN_REFRESH_KEY,
            { expiresIn: '40s' }
        )

        return res.status(200).json({
            success : true ,
            message : 'Đăng nhập thành công',
            body : {
                tokenAccess ,
                tokenRefresh

            }
        }) 
    }   
    catch(err){ 
        console.log(err);
        res.status(500).json({
            success : false ,
            message : 'Đăng nhập thất bại',
           
        }) 
    }
}


/*
    method : POST
    url : /auth/create
    body : username , password , name , role
*/

const create = async ( req , res ) =>{  
     
    try{

        const user = await userModel.findOne({ username : req.body.username })       
        if(user) return res.json({
            successs : false ,
            message : 'Username đã bị trùng vui lòng thử lại '
        }); 
        
        const password = await argon2.hash(req.body.password)
        const body = {
            username : req.body.username,
            password : password,
            name : req.body.name,
            role : req.body.role  
        }
        const usermodel = new userModel(body);

        await usermodel.save();
        return res.sendStatus(200).json({
            successs : true ,
            message : 'tạo tài khoảng thành công  ',
            data : usermodel

        }); 
    }
    catch(err){
        console.log(err);
        return res.sendStatus(400)

    }

}


/*
    method : POST 
    url : /auth/token 
    body : accessToken 
*/

const token = async ( req , res ) =>{
    const refreshToken =  req.body.refreshToken
    if(!refreshToken) return res.status(403).json({success : false  , message : "Refresh token không tồn tại"})

    try{
        const payload = await jwt.verify(refreshToken , process.env.TOKEN_REFRESH_KEY);
        
        const tokenAccess = await jwt.sign({user_id : payload.user_id} ,
            process.env.TOKEN_ACCESS_KEY,
            { expiresIn: '20s' })

        return res.status(200).json({
            success : true ,
            message : 'Tạo token thành công',
            body : {
                tokenAccess
            }
            
        })
    }
    catch(err)
    {
       
        return res.sendStatus(400)
    }
}

module.exports = {
    login ,
    create ,
    token
}