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
            user_id serial primary key, 
            firstName varchar(100),
            lastName varchar(100),
            email varchar(100),
            passHash varchar(100)
        );
        insert into users(firstName,lastName,email,passHash)
        values('chumeeeks','tet','sahdihdiahsdi@sadih,com','asdawdd');
        create table prescription(
            pres_id serial primary key, 
            name varchar(150),
            dosage int, 
            freq int,
            user_id INT references users(user_id)
        );

        create table doctor (
            doctor_id serial primary key, 
            first_name varchar(200),
            last_name varchar(200),
            title varchar(200),
            img TEXT
        );

        insert into doctor(first_name,last_name,title,img)
        values
        ('John','Smith','Cardiologist','https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg'),
        ('Jane ','Williams','Pediatrics','https://t3.ftcdn.net/jpg/03/08/95/96/360_F_308959677_9dsUpeKnj2wWy42Vr8ofYNeKoazLXgSX.jpg'),
        ('Michael ','Brown','Oncologist','https://i.pinimg.com/736x/d6/98/e4/d698e40a01d77ed5e3394851338a4c5c.jpg'),('David','Lee','Surgeon','https://www.stockvault.net/data/2015/09/01/177580/preview16.jpg'),
        ('Lisa','Rodriguez','Psychiatrist','https://media.istockphoto.com/photos/doctor-holding-digital-tablet-at-meeting-room-picture-id1189304032?b=1&k=20&m=1189304032&s=612x612&w=0&h=3IlZQ_IDMJDkjPCThsflr8vmCZVPmxXPWLzsxb8rShQ=')
        
    `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))

    },
    getPhysicians: (req, res) => {
        sequelize.query(`
        select * from doctor
        `).then(dbres => res.status(200).send(dbres[0])
        )
    },
    addPrescription: (req, res) => {
        const { freq, name, dosage, user_id } = req.body
        sequelize.query(`
        insert into prescription(name, dosage, freq, user_id)
        values('${name}',${dosage},${freq},${user_id})
        `).then(() => res.sendStatus(200))
    },
    getPrescription: (req, res) => {
        const { user_id } = req.body
        sequelize.query(`
        select * from prescription
        where user_id = ${user_id}
        `).then(dbres => res.status(200).send(dbres[0]))

    },
    deletePrescription: (req, res) => {
        const { pres_id } = req.body
        sequelize.query(`
        delete from prescription 
        where pres_id = ${pres_id}        
        
        `).then(() => {

            console.log('deleted')
            res.sendStatus(200)
        })
    }

}
