'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yelpFusion = require('yelp-fusion');

var _yelpFusion2 = _interopRequireDefault(_yelpFusion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();

var client = _yelpFusion2.default.client(process.env.YELP_API_KEY);

var Yelp = function () {

    /**
     * Creates a Yelp instance
     *
     */

    function Yelp() {
        _classCallCheck(this, Yelp);
    }

    /**
     * Searchs Yelp on a given data set.
     *
     * @param {Object} data
     * @param {Function} callback
     */

    _createClass(Yelp, [{
        key: 'search',
        value: function search(data, callback) {
            client.search(data).then(function (response) {
                return callback & callback(null, response);
            }).catch(function (error) {
                console.log('Error: search yelp with this data:', data, 'error:', error);

                callback(error, null);
            });
        }
    }]);

    return Yelp;
}();

module.exports = Yelp;
//# sourceMappingURL=yelp.js.map