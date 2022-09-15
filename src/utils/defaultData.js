const AccomodationsImages = require('../models/accomodationsImages.models')
const Accommodations = require('../models/accommodations.models')
const Places = require('../models/places.models')
const Reservations = require('../models/reservations.models')
const Users = require('../models/user.model')
const UserImages = require('../models/userImages.models')
const Roles = require('../models/roles.model')

const generateData = async() => {
    await Roles.bulkCreate([
      {name: "guest", id: "c4d345ef-1361-4980-ba65-c801c8598dfe"}, 
      {name: "host", id: "4ed8d27d-d7c1-454b-93a4-3a2932c4225a"}, 
      {name: "admin", id: "79ec9496-0d2d-4389-a925-acd9de022792"}
    ])

    await Users.bulkCreate([
      {
        id: "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
        firstName: "Sahid",
        lastName: "Kick",
        gender: "male",
        email: "sahid.kick@academlo.com",
        password: "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
        phone: "1234567890",
        birthdayDate: "2000/10/22",
        dni: "",
        address: "",
        roleId: "79ec9496-0d2d-4389-a925-acd9de022792",
        status: "active",
        verified: false
      },
      {
        id: "0d232c1c-b121-41b7-8894-547066eb4406",
        firstName: "Luis David",
        lastName: "Valencia Gómez",
        gender: "male",
        email: "luis.valencia@academlo.com",
        password: "$2a$10$.Gzeo7eYjYfNpKEggdbBJ.wquXYQ9XbmWI4.Z24Y1Lcin89ljNsK6", // bender
        phone: "1234567890",
        birthdayDate: "2001/07/17",
        dni: "",
        address: "",
        roleId: "c4d345ef-1361-4980-ba65-c801c8598dfe",
        status: "active",
        verified: false
      },
      {
        id: "704c0c60-6814-4330-a339-734e10582a76",
        firstName: "Erika Katherine",
        lastName: "Gama Stark",
        gender: "female",
        email: "erika.kat@academlo.com",
        password: "$2a$10$Ng0vngNRQIQ3M.DvWQ4aGepSjSFhO/S4AzcsdI52K3W/msDxQ7IIS",//brandy
        phone: "1234567890",
        birthdayDate: "1997/04/02",
        dni: "",
        address: "",
        roleId: "4ed8d27d-d7c1-454b-93a4-3a2932c4225a",
        status: "active",
        verified: false
      }
    ])


    await Places.bulkCreate([
        {
          id: '864ee3c2-facd-4a23-8b4a-4e9d342d9036',
          city: 'Guadalajara',
          state: 'Jalisco',
          country: 'México',
          continent: 'America'
        },
        {
          id: '9c0412b6-7d56-4347-8fbe-5455e8a42438',
          city: 'Zapopan',
          state: 'Jalisco',
          country: 'México',
          continent: 'America'
        },
        {
          id: '3436a556-6623-40ba-88b8-2e01009f9d82',
          city: 'Suba',
          state: 'Bogotá',
          country: 'Colombia',
          continent: 'America'
        },
        {
          id: '134a55b6-487c-46cc-a5b5-9392af20c205',
          city: 'Medellín',
          state: 'Antioquia',
          country: 'Colombia',
          continent: 'America'
        },
        {
          id: '53d592f3-b475-44a1-ae9a-88277414d777',
          city: 'Armenia',
          state: 'Quindío',
          country: 'Colombia',
          continent: 'America'
        },
        {
          id: '3a230417-80ae-4232-a8ff-6fd50068a777',
          city: 'Azcapotzalco',
          state: 'CDMX',
          country: 'México',
          continent: 'America'
        },
        {
          id: '0d907427-7623-4ec9-8c6d-270bb92fbbe7',
          city: 'Monterrey',
          state: 'Muevo León',
          country: 'México',
          continent: 'America'
        },
    ])
    
     await Accommodations.bulkCreate([{
        id: '65b4f616-2e5f-4582-8fad-9559871ad615',
        title: 'Premium - Vistas 360 ciudad (piscina y gym)',
        description: 'asd',
        guests: 6,
        rooms: 3,
        beds: 3,
        bathrooms: 4.5,
        price: 1536.00,
        hostId: "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
        score: 0.0,
        placeId: '9c0412b6-7d56-4347-8fbe-5455e8a42438',
        commision:150.00
      },
      {
        id: '33475eed-8468-4c1b-a7e7-352d385c0b2e',
        title: 'Mirador al valle del cocora (jacuzzy)',
        description: 'asd',
        guests: 2,
        rooms: 1,
        beds: 1,
        bathrooms: 1,
        price: 3036.00,
        hostId: "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
        score: 0.0,
        placeId: '53d592f3-b475-44a1-ae9a-88277414d777',
        commision:150.00
      }
     ])


     await Reservations.bulkCreate([{
        id: '9d2027c1-5180-4de2-b04c-dd15f183f39f',
        userId: "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
        arrival: '2000/10/22',
        departure: '2000/10/24',
        accommodationId: "65b4f616-2e5f-4582-8fad-9559871ad615",
        adults: 1,
        kids: 0,
        bebies: 0,
        pets: 0,
        score: 0.0,
        isFinished: true,
        isCanceled: false
     },
     {
        id: '0dc148fb-9016-4993-a41b-692eab3ad2f9',
        userId: "0d232c1c-b121-41b7-8894-547066eb4406",
        arrival: '2024/10/07',
        departure: '2024/10/13',
        accommodationId: "65b4f616-2e5f-4582-8fad-9559871ad615",
        adults: 4,
        kids: 0,
        bebies: 0,
        pets: 0,
        score: 0.0,
        isFinished: false,
        isCanceled: false
     },
     {
        id: '4faad4eb-0b3a-4f15-ba55-00b9bb01e697',
        userId: "0d232c1c-b121-41b7-8894-547066eb4406",
        arrival: '2045/01/13',
        departure: '2045/01/23',
        accommodationId: "33475eed-8468-4c1b-a7e7-352d385c0b2e",
        adults: 1,
        kids: 0,
        bebies: 0,
        pets: 0,
        score: 0.0,
        isFinished: false,
        isCanceled: false
     }
    ])
     
}
module.exports = generateData

