import bodyParser from 'body-parser';

import Sequelize from 'sequelize';

import cors from 'cors';

import EventRoutes from './routes/EventRoutes';
import MovieRoutes from './routes/MovieRoutes';
import RecommendationRoutes from './routes/RecommendationRoutes';
import UsersRoutes from './routes/UsersRoutes';

// Initialize express and routing
const app = require('express')();

//Provide access to .env variables
require('dotenv').load();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Connect routes
app.use('/events', EventRoutes);
app.use('/movies', MovieRoutes);
app.use('/recommendations', RecommendationRoutes);
app.use('/user', UsersRoutes);

// Launch the server on port 3000
app.listen(3000, () => console.log('App listening on port 3000'));







