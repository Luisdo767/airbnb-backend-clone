const reservationsControllers = require('./reservations.controllers')


const getAll = (req, res) => {
    reservationsControllers.getAllReservations()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}


const getById = (req, res) => {
    const id = req.params.id
    reservationsControllers.getReservationById(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const postReservation = (req, res) => {
    const userId = req.user.id
    const data = req.body
    const acomodationId = req.params.id

    reservationsControllers.createReservation(data, userId, acomodationId)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })

}


const removeReservation = (req, res) => {
    const reservationId = req.params.reservationId

    reservationsControllers.cancelReservation(reservationId)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}


const editScoreReservation = (req, res) => {
    const reservationId = req.params.reservationId
    const score = req.body

    reservationsControllers.editScore(reservationId, score.score)
        .then((response) => {
            if(response){
                return res.status(200).json({message: "Score edited succesfully"})
            } else {
                return res.status(400).json({message: "The reservation has not finished yet"})
            }
        })
        .catch(err => {
            return res.status(400).json(err)
        })
}


const getByAccommodation = (req, res) => {
    const accommodationId = req.params.id

    reservationsControllers.getReservationByAccommodation(accommodationId)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}


module.exports = {
    getAll,
    getById,
    postReservation,
    removeReservation,
    editScoreReservation,
    getByAccommodation
}