import fetch from 'node-fetch';

require('dotenv').config();

const apiKey = process.env.FANDANGO_API_KEY;
const sharedSecret = process.env.FANDANGO_SHARED_SECRET;

var http = require('http');

String.prototype.format = String.prototype.f = function() {

    var s = this,
    i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
}

function sha256Encode(stringToEncode) {

    var crypto = require('crypto');
    var result = crypto.createHash('sha256').update(stringToEncode).digest('hex');

    return result;
}

function buildAuthorizationParameters(apiKey, sharedSecret) {

    var seconds = Math.floor(new Date() / 1000);
    var paramsToEncode = apiKey + sharedSecret + seconds;
    var encodedParams = sha256Encode(paramsToEncode);

    var result = 'apikey={0}&sig={1}'.format(apiKey, encodedParams);

    return result;
}

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
         var baseUri = 'http://api.fandango.com';
        var apiVersion = '1';

        var zipCode = '95811';
        var parameters = 'op=theatersbypostalcodesearch&postalcode={0}'.format(zipCode);

        // Use your account-specific values here

        var authorizationParameters = buildAuthorizationParameters(apiKey, sharedSecret);

        var requestUri = '{0}/v{1}/?{2}&{3}'.format(baseUri, apiVersion, parameters, authorizationParameters);

        var response = '';

        http.get(requestUri, function(apiRes) {
                 apiRes.on('data', function(data) {
                        response += data;

                        console.log('RESPONSE', response);
                    });

                 apiRes.on('end', function() {
                           //serverRes.end(response);
                    });
                 });

        return 'done';
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
