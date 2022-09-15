const { DataTypes } = require('sequelize')
const { db } = require('../utils/database')


const UsersImages = db.define('user_Images', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_image'
    }
})


module.exports = UsersImages

