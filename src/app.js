//* Dependencias 
const express = require('express')
const passport = require('passport')
require('./middleware/auth.middleware')(passport)
const path = require('path')
const swaggerUi = require('swagger-ui-express')

//* Archivos de rutas 
const userRouter = require('./users/users.routes').router
const authRouter = require('./auth/auth.routes').router
const accommodationRouter = require('./accomodations/accommodations.routes').router
const reservationsRouter = require('./reservations/reservations.routes').router

const initModels = require('./models/init.models')
const defaultData = require('./utils/defaultData')
const swaggerDoc = require('./swagger.json')
const config = require('./utils/config')
//* Configuraciones iniciales

const app = express()
const {db} = require('./utils/database')

initModels()

db.authenticate()
    .then(() => console.log('Database autenticated'))
    .catch((err) => console.log(err))

if(config.aplicationState === 'production'){
    db.sync()
        .then(() => {
            console.log("Database synced")
            defaultData()
        })
        .catch(err => console.log(err))
} else {
    db.sync({force: true})
        .then(() => {
            console.log("Database synced")
            defaultData()
        })
        .catch(err => console.log(err))
}


//? Esta configuracion es para habilitar el req.body
app.use(express.json())


app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/accommodations', accommodationRouter)
app.use('/api/v1/reservations', reservationsRouter)


app.use('/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.get('/api/v1/uploads/:imgName', (req, res) => {
    const imgName = req.params.imgName
    res.status(200).sendFile(path.resolve('uploads/') + '/' + imgName)
})

/**
 * 
 app.get("/api", async (req, res) => {
 
     try {
       const data = await Accommodations.create({
         id: "7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
         title: "premium - vistas 360 ciudad (alberca y gym)",
         description: "asd",
         guests: 6,
         rooms: 3,
         beds: 3,
         bathrooms: 4.5,
         price: 1536.00,
         hostId : '74cd6011-7e76-4d6d-b25b-1d6e4182ec2f',
         score: 0.00,
         placeId: '9c0412b6-7d56-4347-8fbe-5455e8a42438',
         commision: 150.00
       })
       res.status(200).json({ message: "All ok!", data });
   
     } catch (error) {
       res.status(400).json(error)
     }
   
     //res.status(200).json({ message: "All ok!" });
 });
 */



app.listen(config.port, () => {
    console.log('Server started at port: 8000');
})



module.exports = app