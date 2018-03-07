import https from 'https';
import _ from 'underscore';
import moment from 'moment';

const appKey = process.env.EVENTBRIGHT_KEY;

class EventsFetcher {

  /**
   * Creates a Event instance.
   *
   * @param ...
   *
   */

  constructor() {
  }

  /**
   * Set the flight number after initialization if needed.
   *
   * @param {String} flightNumber
   */

  setFlightNumber(flightNumber) {
    this._flightNumber = flightNumber;
  }

  /**
   * Set the flight Date after initialization if needed.
   *
   * @param {String} flightDate
   */

  setFlightDate(flightDate) {
    this._flightDate = flightDate;
  }

  /**
   * Fetches flight information.
   *
   * @param {Function} callback
   */

  getFlightInfo(callback) {
    if (!this._flightNumber) {
      throw new Error('Flight Fetcher missing flight number.');
    }

    const options = {
      hostname: 'api.flightstats.com',
      method: 'GET',
      path: this._urlPath()
    };

    const req = https.request(options, (response) => {
      let data = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        data += chunk;
      });

    response.on('end', () => {
      const flightData = JSON.parse(data);
      let index = -1;
      let formattedResponse = null;

      if (_.has(flightData, 'flightStatuses') && flightData.flightStatuses.length !== 0) {
        index = this._getAppropriateFlightIndex(flightData);
      }

      if (index !== -1) {
        formattedResponse = this._formatResponse(flightData, index);
      }

      if (formattedResponse) {
        callback(null, formattedResponse);
      } else {
        callback(new Error('Information for that flight number was not found.'), null);
      }
    });

  });

  req.on('error', (error) => {
    console.log('Error: fetching flight info for flight:', this._flightNumber, 'error:', error);
    callback(error, null);
  });

  req.end();
}

 /**
   * Finds the index of the appropriate flight
   *
   * @returns {Number}
   * @private
   */

  _getAppropriateFlightIndex(reply) {
    let index = null;
    const flightArray = reply.flightStatuses;
    for (let i = 0; i < flightArray.length; i++) {
      if (flightArray[i].departureAirportFsCode === this._departureAirport) {
        index = i;
        break;
      }
    }
    return index === null ? -1 : index;
  }

  /**
   * Builds the path for https library.
   *
   * @returns {String}
   * @private
   */

  _urlPath() {
    const date = this._parseFlightDate();
    const flightNumber = this._parseFlightNumber();

    return `/flex/flightstatus/rest/v2/json/flight/status/${flightNumber.airline
     }/${flightNumber.number}/dep/${date.year}/${date.month}/${date.day}?appId=${
     this._appId}&appKey=${this._appKey}&utc=false`;
  }

    /**
   * Parses the raw flight number into its component.
   *
   * @returns {{airline: String, number: String}}
   * @private
   */

  _parseFlightNumber() {
    if (!this._flightNumber || this._flightNumber.length <= 2) {
      throw new Error('Cannot parse flight number');
    }

    let lastLetterIndex;
    const letters = /^[A-z]+$/;

    for (let i = 0; i < this._flightNumber.length; i++) {
      if (!this._flightNumber[i].match(letters)) {
        lastLetterIndex = i;
        break;
      }
    }

    const airline = this._flightNumber.slice(0, lastLetterIndex);
    const number = this._flightNumber.slice(lastLetterIndex, this._flightNumber.length);
    return {
      airline,
      number
    };
  }

  /**
   * Parses the raw flight date into its components.
   *
   * @returns {{year: *, month: *, day: *}}
   * @private
   */

  _parseFlightDate() {
    if (!this._flightDate) {
      throw new Error('No flight date. Cannot parse the date');
    }

    const parts = this._flightDate.split('-');
    if (parts.length !== 3 || parts[0].length !== 4
      || parts[1].length !== 2 || parts[2].length !== 2) {
      throw new Error('Flight Date is in incorrect format.');
    }

    return {
      year: parts[0],
      month: parts[1],
      day: parts[2]
    };
  }

  /**
   * Extracts the full arrival airport name.
   *
   * @params {Object} reply, {String}
   * @returns {String}
   * @private
   */

  _getArrivalAirport(airports, airportCode) {
    for (let i = 0; i < airports.length; i++) {
      if (airports[i].fs === airportCode) {
        return airports[i].name;
      }
    }
    return null;
  }

  /**
   * Trims the response object from the api to only the necessary fields.
   *
   * @param {Object} reply
   * @returns {*}
   * @private
   */

  _formatResponse(reply, index) {
    if (!_.has(reply.flightStatuses[index], 'arrivalDate') ||
        !_.has(reply.flightStatuses[index].arrivalDate, 'dateLocal') ||
        !_.has(reply.flightStatuses[index], 'arrivalAirportFsCode') ||
        (reply.appendix.airports.length === 0)) {
        return null;
    }

    const formattedDate =
    moment(reply.flightStatuses[index].arrivalDate.dateLocal).format('MMMM Do YYYY, h:mm:ss a');

    const arrivalAirport =
    this._getArrivalAirport(
      reply.appendix.airports,
      reply.flightStatuses[index].arrivalAirportFsCode
    );

    if (arrivalAirport === null) {
      return null;
    }

    return {
      date: formattedDate,
      airport: arrivalAirport
    };
  }
}

module.exports = FlightFetcher;
