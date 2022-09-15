const Users = require('./user.model')
const UserImages = require('./accomodationsImages.models')
const Roles = require('./roles.model')
const Reservations = require('./reservations.models')
const Acomodations = require('./accommodations.models')
const Places = require('./places.models')
const AccommodationsImages = require('./accomodationsImages.models')
const Accommodations = require('./accommodations.models')

const initModels = () => {
    /**
     * a.belongsTo // existe llave foranea en a
     * belongsToMany // existe llave foranea en a
     * hasOne(b) // existe llave foranea en b
     * hasMany // existe llave foranea en b
     */
    //? Roles -> Users
    Roles.hasMany(Users)
    Users.belongsTo(Roles)

    //? Users -> UserImages
    UserImages.belongsTo(Users)
    Users.hasMany(UserImages)

    //? Users <-> Acommodations
    Users.belongsToMany(Acomodations, {through: Reservations})
    Acomodations.belongsToMany(Users, {through: Reservations})

    //? Reservations <- Accommodations
    Reservations.belongsTo(Accommodations)
    //? Reservations <- Users
    Reservations.belongsTo(Users)

    
    //? Accommodations -> AccommodationsImages
    AccommodationsImages.belongsTo(Accommodations)
    Acomodations.hasMany(AccommodationsImages)
    
    //? Places -> Accommodations
    Accommodations.belongsTo(Places)
    Places.hasMany(Accommodations)
    
    //? Users -> Accommodations (host)
    Users.hasMany(Accommodations)
    Accommodations.belongsTo(Users)
}


module.exports = initModels