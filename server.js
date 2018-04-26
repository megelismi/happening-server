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

// Launch the server on port 3000
app.listen(3000, () => console.log('App listening on port 3000'))

