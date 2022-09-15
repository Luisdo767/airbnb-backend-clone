const Reservations = require('../models/reservations.models')
const Users = require('../models/user.model')
const Accommodations = require('../models/accommodations.models')
const uuid = require('uuid')


const getAllReservations = async() => {
    const data = await Reservations.findAll(
        {
        include: [
            
            {
                model: Users,
                attributes: {
                     exclude: ['createdAt', 'updatedAt', 'password']
                }
            },
            {
                model: Accommodations,
                attributes: {
                     exclude: ['createdAt', 'updatedAt']
                }
            }
        ]
        }
    )

    return data
}


const getReservationById = async(id) => {
    const data = await Reservations.findOne({
        where: {
            id
        },
        include: [{
                model: Users,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
               }
            },
            {
                model: Accommodations,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
               }
            }
        ]   
    })

    return data
}


const createReservation = async(data, userId, accommodationId) => {
    const {isFinished, isCanceled, ...restOfData} = data
    const newReservation = await Reservations.create({
        ...restOfData,
        id: uuid.v4(),
        userId: userId,
        accommodationId: accommodationId,
    })
    return newReservation
}


const cancelReservation = async(id) => {
    const data = await Reservations.destroy({
        where: {
            id
        }
    })
    return data
}


const getReservationByAccommodation = async(accomodationId) => {
    const data = await Reservations.findAll({
        include: {
            model: Accommodations,
            where: {
                id: accomodationId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }
    })

    return data
}



const verifyIsFinished = async(id) => {
    const response = await getReservationById(id)
    if(response.dataValues.isFinished === true){
        return true
    } else {
        return false
    }
}



const editScore = async(id, score) => {
    const isFinished = await verifyIsFinished(id)
    if(isFinished){
        const response = await Reservations.update(
            {score},
            {
                where: {
                    id
                }
            }
        )
        return response
    } else {
        return false
    }
}


module.exports = {
    getAllReservations,
    getReservationById,
    createReservation,
    cancelReservation,
    editScore,
    getReservationByAccommodation
}
