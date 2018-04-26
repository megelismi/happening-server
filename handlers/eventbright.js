import https from 'https';

require('dotenv').config();

const personalToken = process.env.EVENTBRITE_PERSONAL_TOKEN;

console.log('personalToken', personalToken);

class Eventbright {

    /**
    * Creates a Eventbright instance.
    *
    * @param ...
    *
    */

    constructor() {

    }

    /**
    * Fetches event information.
    *
    * @param {Function} callback
    */

    getEventInfo(callback) {
        const options = {
            hostname: 'https://www.eventbriteapi.com',
            method:   'GET',
            path:     this._urlPath()
        };

        const req = https.get(this._urlPath(), res => {
            console.log('statusCode', res.statusCode);
            console.log('res Headers', res.headers);

             res.on('data', d => {
                console.log('data', JSON.parse(d));
            });
        });

        req.on('error', error => {
            console.log('Error: retreiving event info:', error);

            callback(error, null);
        });

      req.end();
    }

    /**
    * Builds the path for https library.
    *
    * @returns {String}
    * @private
    */

    _urlPath() {
        return `https://www.eventbriteapi.com/v3/users/me/?token=${personalToken}`;
    }
}

module.exports = Eventbright;
