'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var personalToken = '2Z7WTXSWZLVA4N7LOME2';

console.log('personalToken', personalToken);

var Eventbright = function () {

    /**
    * Creates a Eventbright instance.
    *
    * @param ...
    *
    */

    function Eventbright() {
        _classCallCheck(this, Eventbright);
    }

    /**
    * Fetches event information.
    *
    * @param {Function} callback
    */

    _createClass(Eventbright, [{
        key: 'getEventInfo',
        value: function getEventInfo(callback) {
            var options = {
                hostname: 'eventbriteapi.com',
                method: 'GET',
                path: this._urlPath()
            };

            var req = _https2.default.request(function (options, response) {
                console.log('response!@$@#', response);

                response.on('end', function () {});
            });

            req.on('error', function (error) {
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

    }, {
        key: '_urlPath',
        value: function _urlPath() {
            return '/v3/users/me/?token=' + personalToken;
        }
    }]);

    return Eventbright;
}();

module.exports = Eventbright;
//# sourceMappingURL=eventbright.js.map