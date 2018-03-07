import yelp from 'yelp-fusion';
import Yelp from '../handlers/yelp';

require('dotenv').config();

//Initialize router
const routes = require('express').Router();

//Initialize an instance of Yelp
const recommendations = new Yelp();

routes.get('/', (req, res) => {
    const searchData = {
        term:     'Four Barrel Coffee',
        location: 'san francisco, ca'
    };

    recommendations.search(searchData, (err, response) => {
        if (err) {
            return res.status(500).send('Error retreiving recommendations:', err);
        }

        return res.status(200).json(response.jsonBody.businesses[0]);
    });
});

routes.get('/:id', (req, res) => {
    res.send('single recommendation');
});

module.exports = routes;
