const express = require("express");
const cors = require("cors");
var path = require('path');
const bcrypt = require('bcryptjs');

require("dotenv").config()

const { CONNECTION_STRING, PORT } = process.env
const { seed } = require('./controller')
const { seedTwo } = require('./appointmnet')
const {userLogin, userSignup} = require('./authController')


console.log(PORT)



const app = express();


app.use(express.static('public'))
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public'))
})
app.post('/seed', seed)
app.post('/login', userLogin)

app.post('/signUp', userSignup)



app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})










