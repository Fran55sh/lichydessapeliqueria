require("dotenv").config();

const jwt = require('jsonwebtoken');

function ensureAuth(req, res, next) {
    let access_token = req.cookies.access_token
    jwt.verify(access_token, process.env.JWT_SECRET, async(err, decodedToken) =>{
        if(err){
            console.log(err),
            next()
        }else{
            if (decodedToken.iss.role === 'admin'){
                res.render('admin')
                next()
            }else{
                res.render('profile')
                next()
            }
        }
    })
    next()
    // try {
        
        

    //     return next();

    // } catch (error) {
        
    // };
};

module.exports = ensureAuth;
