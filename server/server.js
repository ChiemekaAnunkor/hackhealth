const express = require("express");
const cors = require("cors");
var path = require('path');
const bcrypt = require('bcryptjs');

require("dotenv").config()

const { CONNECTION_STRING, PORT } = process.env
const { seedAppointment, addAppointment, getAppointment, deleteAppointment, getDoctorsAvaiblity, getUserAppointment } = require('./appointmnet')
const { seed, getPhysicians, addPrescription, getPrescription, deletePrescription } = require('./controller')
const { userLogin, userSignup } = require('./authController')


console.log(PORT)

const app = express();


app.use(express.static('public'))
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public'))
})
app.post('/seed', seed)
app.post('/seedapt', seedAppointment)
app.post("/appointment", addAppointment)
app.get("/appointment", getAppointment)
app.delete("/appointment", deleteAppointment)
app.post("/getDoctorsAvaiblity", getDoctorsAvaiblity)
app.post("/getUserAppointment", getUserAppointment)



app.post('/login', userLogin)
app.post('/signUp', userSignup)
app.get('/getPhysicians', getPhysicians)
app.post('/addPrescription', addPrescription)
app.post('/getPrescription', getPrescription)
app.delete('/deletePrescription', deletePrescription)



app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})










