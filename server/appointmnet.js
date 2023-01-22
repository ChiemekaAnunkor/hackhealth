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

    seedAppointment: (req, res) => {
        sequelize.query(`
        drop table if exists appointment;
     
        create table appointment (
            appointment_id serial primary key, 
            time text,
            description text,
            user_id INT references users(user_id),
            doctor_id INT references doctor (doctor_id)
        );


    `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))

    },

    getAppointment: (req, res) => {
        sequelize.query(`select * from appointment`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err));
    },

    addAppointment: (req, res) => {

        const { time, description, user_id, doctor_id } = req.body
        sequelize.query(`insert into appointment (time, description, user_id, doctor_id)
                        values('${time}','${description}', ${user_id},${doctor_id});
        `)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err));
    },
    deleteAppointment: (req, res) => {

        const { appointment_id } = req.body
        sequelize.query(`
        delete from appointment 
        where appointment_id = ${appointment_id}        
        
        `)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err));
    },
    getDoctorsAvaiblity: (req, res) => {
        const { doctor_id, date } = req.body;
        let dateCopy = `'${date}'`
        console.log(dateCopy)
        sequelize.query(`select * from appointment join doctor as n 
        on n.doctor_id = ${doctor_id}
         where date = ${dateCopy}`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err));
    },
    getUserAppointment: (req, res) => {
        const { user_id } = req.body;
        sequelize.query(`select * from appointment where user_id =${user_id} `)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err));
    },

}