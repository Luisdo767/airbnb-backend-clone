const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware, roleHostMiddleware } = require('../middleware/role.middleware')
const { upload } = require('../utils/multer')
require('../middleware/auth.middleware')(passport)

const userServices = require('./users.http')


router.route('/') //* /api/v1/users
    .get(roleAdminMiddleware, userServices.getAll)

    
router.route('/me')
    .put(passport.authenticate('jwt', {session: false}) ,userServices.editMyUser)
    .get(passport.authenticate('jwt', {session: false}) ,userServices.getMyUser)
    .delete(passport.authenticate('jwt', {session: false}) ,userServices.removeMyUser)


router.route('/me/profile-img')
    .post(passport.authenticate('jwt', {session: false}) , upload.single('profile_img'), userServices.postProfileImg)


router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}), roleHostMiddleware, userServices.getById)
    .delete(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, userServices.remove)
    .put(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, userServices.edit)


module.exports = {
    router
}
