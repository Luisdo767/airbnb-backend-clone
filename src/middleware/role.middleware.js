const Role = require('../models/roles.model')

const roleAdminMiddleware = (req, res, next) => {
    Role.findOne({
        where: {
            name: 'admin'
        }
    }).then((response) => {
        const rol = req.user.rol

        if(rol === response.id){
            next()
        } else {
            res.status(401).json({status: 'error', message: 'User not authorized to make this request'})
        }
    }).catch(() => {
        res.status(401).json({status: 'error', message: 'User not authorized to make this request'})
    })
}


const roleHostOrAdmin = async(req, res, next) => {
    //? Seria mejor guardarlas en variables de entorno??
    const guest = await Role.findOne({
        where: {
            name: 'guest'
        }
    })
    const host = await Role.findOne({
        where: {
            name: 'admin'
        }
    })
    const user = req.user
    if(user){
        const userRol = req.user.rol || false
        if(userRol === guest.id || userRol === host.id || userRol === admin.id){
            next()
        } else {
            res.status(401).json({status: 'error', message: 'User not authorized to make this request'})
        }
    }  else {
        res.status(401).json({status: 'error', message: 'User rol not found'})
    }
}



const roleHostMiddleware = (req, res, next) => {
    Role.findOne({
        where: {
            name: 'host'
        }
    }).then((response) => {
        const rol = req.user.rol

        if(rol === response.id){
            next()
        } else {
            res.status(401).json({status: 'error', message: 'User not authorized to make this request'})
        }
    }).catch(() => {
        res.status(401).json({status: 'error', message: 'User not authorized to make this request'})
    })
}

module.exports = {
    roleAdminMiddleware,
    roleHostMiddleware,
    roleHostOrAdmin
}