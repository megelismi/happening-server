'use strict';

import Eventbright from '../handlers/eventbright';

require('dotenv').config();

const routes = require('express').Router();

const eventFetcher = new Eventbright();

routes.get('/', (req, res) => {
    eventFetcher.getEventInfo((err, response) => {
        if (err) {
            console.log('womp womp womp', err);

            return;
        }

        console.log('response!@# what what', response);

        return res.status(200);
    })
});

routes.get('/:eventId', (req, res) => {
    res.send('single event');
});

module.exports = routes;
