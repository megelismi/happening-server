const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('all events');
});

routes.get('/:eventId', (req, res) => {
  res.send('single event');
});

module.exports = routes;
