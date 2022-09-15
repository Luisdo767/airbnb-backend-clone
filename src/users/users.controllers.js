const uuid = require('uuid')
const crypt = require('../utils/crypt')
const Users = require('../models/user.model')
const Roles = require('../models/roles.model')

const userDB = [{
    "id": "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
    "firstName": "Sahid",
    "lastName": "Kick",
    "email": "sahid.kick@academlo.com",
    "password": "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
    "phone": "1234567890",
    "birthdayDate": "22/10/2000",
    "rol": "admin",
    "profile_image": "",
    "country": "mexico",
    "is_active": true,
    "verified": false
}]


const getAllUsers = async() => {
    const data = await Users.findAll({
        attributes: {
            exclude: ['password']
        }
    })

    return data
    //? select * from users;
}


const getUserById = async (id) => {

    const data = await Users.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: ['password']
        }
    })
    return data
    //? select * from users where id = ${id};
}


const createUser = async (data) => {
    
    const newUser =  await Users.create({
        id: uuid.v4(), 
        firstName: data.first_name, 
        lastName: data.last_name,
        gender: data.gender, 
        email: data.email, 
        password: crypt.hashPassword(data.password), 
        phone: data.phone, 
        birthdayDate: data.birthday_date,
        dni: data.dni,
        role_id: "c4d345ef-1361-4980-ba65-c801c8598dfe",
        address: data.address, 
        profileImage: data.profile_image,
        status: 'active',
        verified: false,
    })
    

    return newUser
}


const editUser = async (userId, data, userRol) => {
    const {id, password, verified, role_id, ...restOfProperties} = data
    const rol = await Roles.findOne({
        where: {
            name: 'admin'
        }
    })
    if(rol.id === userRol){
        const response = await Users.update({...restOfProperties, role_id}, {where: {id: userId}})
        return response
    } else {
        const response = await Users.update(restOfProperties, {where: {id: userId}})
        return response
    }

    /**
     * 
     if(index !== -1){
         userDB[index] = {
             id: id,
             first_name: data.first_name,
             last_name: data.last_name, 
             email: data.email,
             password: userDB[index].password,
             phone: data.phone, 
             birthday_date: data.birthday_date, 
             rol: data.rol, 
             profile_image: data.profile_image,
             country: data.country, 
             is_active: data.is_active, 
             verified: false 
         }
         return userDB[index]
     } else {
         return createUser(data)
     }
     */
}


const deleteUser = async(id) => {
    const data = await Users.destroy({
        where: {
            id
        }
    })
    return data
}


const getUserByEmail = async(email) => {
    const data = await Users.findOne({where: {email}})
    return data
    //? select * from users where email = ${email};
}


const editProfileImg = async(imgUrl, userId) => {
    const response = await Users.update(
        {profileImage},
        {where: {id: userId}}
    )

    return response
}


const getUserWithRole = async(userId) => {
    const data = await Users.findOne({
        where: {
            id: userId
        },
        include: {
            model: Roles,
            as: 'role',
            attributes: [{
                exclude: ["id", "createdAt", "updatedAt"],
            }]
        },
        attributes: {
            exclude: ['password', 'created_at', 'updated_at']
        },
        })
    return data
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser,
    getUserByEmail,
    editProfileImg,
    getUserWithRole
}