const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('home');
});

module.exports = routes;