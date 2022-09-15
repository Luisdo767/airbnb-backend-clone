require('dotenv').config()

module.exports = {
    port: process.env.PORT || 3000,
    aplicationState: process.env.NODE_ENV || 'development',
    DBusername: process.env.DB_USER_NAME,
    DBpassword: process.env.DB_PASSWORD,
    secretOrKey: process.env.SECRET_OR_KEY
}

