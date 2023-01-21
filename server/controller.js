require('dotenv').config() //if this doesnt work use this require('dotenv').config({ path: '../.env' })

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});


module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        drop table if exists users;
        drop table if exists prescription;
        drop table if exists doctor;

        create table users (
            id serial primary key, 
            first_name varchar(100),
            last_name varchar(100),
            email varchar(100),
            password varchar(100)
        );

        create table prescription(
            pres_id serial primary key, 
            name varchar(150),
            dosage int, 
            freq int,
            id INT references users(id)
        );

        create table doctor (
            doctor_id serial primary key, 
            first_name varchar(200),
            last_name varchar(200),
            title varchar(200),
            img TEXT
        );
        
    `).then(() => {
                console.log('DB seeded!')
                res.sendStatus(200)
            }).catch(err => console.log('error seeding DB', err))

    },
    cancelAppointment: (req, res) => {

    },
    getAppointments:(req, res) => {

    },
    getPhysicians:(req, res) => {

    },
    addPrescription:(req, res) => {
        
    },
    getPrescription:(req, res) => {

    },




}