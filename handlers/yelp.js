'use strict';

require('dotenv').config();

import yelp from 'yelp-fusion';

const client = yelp.client(process.env.YELP_API_KEY);

class Yelp {

  /**
   * Creates a Yelp instance
   *
   */

   constructor() {

   }

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
    };
}

module.exports = Yelp;

