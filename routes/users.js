const routes = require('express').Router();

routes.get('/', (req, res) => {
    console.log('endpoint hit for users');

    res.status(200).json({message: 'all users'});
});

routes.get('/:userId', (req, res) => {
    res.send('single user');
});

module.exports = routes;
