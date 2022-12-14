const Accommodations = require('../models/accommodations.models')
const Places = require('../models/places.models')
const Users = require('../models/user.model')
const uuid = require('uuid')

const getAllAccommodations = async() => {
    
    const data = await Accommodations.findAll({
        include: [{
            model: Places,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Users,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            }
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'userId', 'placeId', 'hostId']
        }
    })

     
    /**
     * 
     const data = await Users.findAll({
         include: {
             model: Accommodations,
             include: {
                 model: Places,
                 attributes: {
                     exclude: ['createdAt', 'updatedAt']
                 }
             }
         }
     })
     */
    
    return data
}


const getAccommodationById = async(id) => {
    const data = Accommodations.findOne({
        where: {
            id
        },
        include: [{
            model: Places,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        },
        {
            model: Users,
            as: 'user',
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        }
        
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'userId', 'placeId', 'hostId']
        }
    })
    return data
}


const createAccommodation = async(data) => {
    const newAccommodation =  await Accommodations.create({
        id: uuid.v4(), 
        title: data.title,
        description: data.description,
        guests: data.guests,
        rooms: data.rooms,
        beds: data.beds,
        bathrooms: data.bathrooms,
        price: data.price,
        hostId: data.hostId,
        score: 0.0,
        placeId: data.placeId,
        commision: data.commision
    })
    return newAccommodation
}


const deleteAccommodation = async(id) => {
    const response = await Accommodations.destroy({
        where: {
            id
        }
    })
    return response
}



const editAccommodation = async(accId, data) => {
    const {id, hostId, score, ...restOfProperties} = data
    const response = await Accommodations.update(
        restOfProperties,
        {where: {
            id: accId
        }}
    )
    console.log(response)
    return response
}



const getMyAccomodations = async(hostId) => {
    const response = Accommodations.findAll({
        where: {
            hostId: hostId
        },
        include: [{
            model: Places,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'userId', 'placeId', 'hostId']
        }
    })
    return response
}


module.exports = {
    getAllAccommodations,
    getAccommodationById,
    createAccommodation,
    deleteAccommodation,
    editAccommodation,
    getMyAccomodations
}