const reservationsHttp = require('./reservations.http')
const router = require('express').Router()
const passport = require('passport')

const { roleAdminMiddleware } = require('../middleware/role.middleware')
require('../middleware/auth.middleware')(passport)


router.route('/')
    .get(passport.authenticate('jwt', {session: false}), roleAdminMiddleware,  reservationsHttp.getAll)


router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}), reservationsHttp.getById)



module.exports = {
    router
}