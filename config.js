require('dotenv').config();

module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwt_secret: process.env.JWT_SECRET,
    filepath: process.env.FILEPATH,
    access_token: process.env.ACCESS_TOKEN

    
    }
