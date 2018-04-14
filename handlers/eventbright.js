import https from 'https';

const personalToken = '2Z7WTXSWZLVA4N7LOME2';

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
            hostname: 'eventbriteapi.com',
            method:   'GET',
            path:     this._urlPath()
        };

        const req = https.request((options, response) => {
            console.log('response!@$@#', response);

             response.on('end', () => {

            });
        });

        req.on('error', (error) => {
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
        return `/v3/users/me/?token=${personalToken}`;
    }
}

module.exports = Eventbright;
