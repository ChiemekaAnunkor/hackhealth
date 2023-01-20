const express = require("express");
const cors = require("cors");
var path = require('path');

require("dotenv").config()

const { CONNECTION_STRING, PORT } = process.env

console.log(PORT)



const app = express();


app.use(express.static('public'))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public'))
})





app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})










