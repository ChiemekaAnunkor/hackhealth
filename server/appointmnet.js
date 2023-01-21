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
            user_id INT references users(user_id)
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

        const { time, description, user_id } = req.body
        sequelize.query(`insert into appointment (time, description, user_id)
                        values('${time}','${description}', ${user_id});
        `)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err));
    },
    deleteAppointment: (req, res) => {

        const { time, description, user_id } = req.body
        sequelize.query(`insert into appointment (time, description, user_id)
                        values('${time}','${description}', ${user_id});
        `)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err));
    },

}