import home from './routes';
import events from './routes/events';
import users from './routes/users';
import cors from 'cors';

// Initialize express and routing
const app = require('express')();

app.use(cors());

// Connect routes
app.use('/', home);
app.use('/events', events);
app.use('/users', users);

// Launch the server on port 3000
app.listen(3000, () => console.log('App listening on port 3000'))

