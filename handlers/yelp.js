require('dotenv').config();

import yelp from 'yelp-fusion';
import https from 'https';
import _ from 'underscore';

const moment = require('moment');
const client = yelp.client(process.env.YELP_API_KEY);

class Yelp {

  /**
   * Creates a review Yelp instance
   *
   */

  //constructor() {}

  /**
   * Searchs Yelp on a given data set.
   *
   * @param {Object} data
   * @param {Function} callback
   */

  search(data, callback) {
    client.search(data)
        .then(response => callback & callback(null, response))
        .catch(error => {
            console.log('Error: search yelp with this data:', data, 'error:', error);

            callback(error, null);
        });
    ;
  }
}

module.exports = Yelp;

