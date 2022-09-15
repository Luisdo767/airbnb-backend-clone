const {Sequelize} = require('sequelize')
const config = require('../utils/config')

const db = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: config.DBusername,
    password: config.DBpassword,
    database: 'airbnb',
    post: 5432
})


module.exports = {
    db
}

