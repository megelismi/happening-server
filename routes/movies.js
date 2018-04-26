'use strict';

import Fandango from '../handlers/fandango';

require('dotenv').config();

const routes = require('express').Router();

const movieFetcher = new Fandango();

routes.get('/', (req, res) => {
    movieFetcher.getMovieInfo((err, response) => {
        if (err) {
            console.log('got an error from fandango', err);

            return;
        }

        console.log('response from fandango!', response);

        return res.status(200).json(response);
    });
});

routes.get('/:movieId', (req, res) => {
    res.send('single movie');
});

module.exports = routes;
