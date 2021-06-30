const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
    username : { type : String  , unique : true , require : true }  ,
    password : { type : String   , require : true  },
    name : { type : String },
    role : {
        type : Boolean ,
        require : true ,
        default : true
    }
}, 
{
    timestamps : true
})


module.exports = mongoose.model('users' , userModel); 