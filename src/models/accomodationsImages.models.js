const { DataTypes } = require('sequelize')
const { db } = require('../utils/database')


const AccommodationsImages = db.define('accommodations_images', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    accommodationId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'accomodation_id'
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    }
})

module.exports = AccommodationsImages