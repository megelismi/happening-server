import fetch from 'node-fetch';

require('dotenv').config();

const apiKey = process.env.FANDANGO_API_KEY;

console.log('apiKey', apiKey);

class Fandango {

    /**
    * Creates a Eventbright instance.
    *
    * @param ...
    *
    */

    constructor() {

    }

    /**
    * Fetches movie information.
    *
    * @param {Function} callback
    */

    getMovieInfo(callback) {
        fetch(this._urlPath())
            .then(response => {
                console.log('response', response.json());

                //response.json();
            }).then(json => {
                    //console.log('got a json response', json);

                    //callback(null, json);
            }).catch(error => {
                    console.log('got an error', error);

                    //callback(error);
            })
        ;
    }

    /**
    * Builds the url path
    *
    * @returns {String}
    * @private
    */

    _urlPath() {
        return `http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=${apiKey}&page_limit=1`;
    }
}

export default Fandango;
