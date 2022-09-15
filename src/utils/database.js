const {Sequelize} = require('sequelize')
const config = require('../utils/config')

const db = new Sequelize({
    dialect: 'postgres',
    host: config.DBhost,
    username: config.DBusername,
    password: config.DBpassword,
    database: config.DB,
    post: 5432
})


module.exports = {
    db
}

