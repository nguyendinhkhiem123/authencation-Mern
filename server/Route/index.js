const AuthencationRoute = require('./AuthencationRoute');
const UserRoute = require('./UserRoute');
function Route(app){
    
    app.use('/auth' , AuthencationRoute);
    app.use('/get' , UserRoute);
    app.get('/' , (req , res) =>{
        return res.send('hello');
    })
}


module.exports = Route;