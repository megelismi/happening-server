import Sequelize from 'sequelize';

import events from './routes/events';
import home from './routes';
import movies from './routes/movies';
import recommendations from './routes/recommendations';

import cors from 'cors';

//Provide access to .env variables
require('dotenv').config();

// Initialize express and routing
const app = require('express')();

app.use(cors());

// Connect routes
app.use('/', home);
app.use('/events', events);
app.use('/movies', movies);
app.use('/recommendations', recommendations);

//Connect to the database
export const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

//Test database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Launch the server on port 3000
app.listen(3000, () => console.log('App listening on port 3000'));

