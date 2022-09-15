/**
 * {
    "id": "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
    "first_name": "Sahid",
    "last_name": "Kick",
    "email": "sahid.kick@academlo.com",
    "password": "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
    "phone": "1234567890",
    "birthday_date": "22/10/2000",
    "rol": "admin",
    "profile_image": "",
    "country": "mexico",
    "is_active": true,
    "verified": false
}
 */

const { DataTypes } = require('sequelize')

const {db} = require('../utils/database')

const Users = db.define('user', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'first_name'
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name'
    },
    gender: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING(30),
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    birthdayDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'birthday_date'
    },
    dni: {
        type: DataTypes.STRING
    },
    roleId: {
       allowNull: false,
       type: DataTypes.UUID,
       field: 'role_id'
    },
    address: {
        type: DataTypes.STRING
    },
    profileImage: {
        type: DataTypes.STRING,
        validate: {
           isUrl: true
        },
        field: 'profile_image',
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'active' //active, non-active, deleted, suspended
    },
    verified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at'
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at'
    }

})

module.exports = Users