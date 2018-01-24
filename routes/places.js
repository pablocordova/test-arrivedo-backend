
// Dependencies
const express = require('express');
const request = require('request');
const validator = require('validator');

const NodeCache = require( 'node-cache');

const router = express.Router();

const myCache = new NodeCache();
const config = require('../config/general.js');
const auth = '&client_id=' + process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET +
  '&v=' + process.env.VERSION_API;

router.get('/top10', (req, res) => {

  const topNumber = '10';
  const lat = req.query.lat;
  const lon = req.query.lon;

  const isMissedLat = typeof(lat) === 'undefined';
  const isMissedLon = typeof(lon) === 'undefined';

  // Validate if parameters exist
  if (isMissedLat || isMissedLon) {

    const messageError = {
      lat: isMissedLat,
      lon: isMissedLon
    };

    return res.status(config.STATUS.BAD_REQUEST).send({
      message: config.RES.MISSING_PARAMETERS,
      result: messageError
    });
  }

  // Validate inputs
  const isDecimalLat = validator.isDecimal(lat);
  const isDecimalLon = validator.isDecimal(lon);

  if (!isDecimalLat || !isDecimalLon) {

    const messageError = {
      lat: !isDecimalLat,
      lon: !isDecimalLon
    };

    return res.status(config.STATUS.BAD_REQUEST).send({
      message: config.RES.NO_VALID,
      result: messageError
    });
  }

  // Cache to improve performance
  const key = lat + lon;
  const value = myCache.get(key);

  if (value) {
    myCache.ttl(key, config.TTL);
    return res.status(config.STATUS.OK).send({
      message: config.RES.OK,
      result: value.data
    });
  }

  request.get(
    {
      url:'https://api.foursquare.com/v2/venues/explore?' +
        'limit=' + topNumber + '&ll=' + lat + ',' + lon + auth
    },
    function callback(err, data) {

      if (err) {
        return res.status(config.STATUS.SERVER_ERROR).send({
          message: config.RES.ERROR_DATABASE,
          result: err
        });
      } else {

        let placesTopRes = [];
        let body = JSON.parse(data.body);
        let placesTopFoursquare = body.response.groups[0].items;

        for (let placesTop of placesTopFoursquare) {

          const objPlaces = {
            name: placesTop.venue.name,
            phone: placesTop.venue.contact.phone,
            location: placesTop.venue.location.formattedAddress
          };

          placesTopRes.push(objPlaces);

        }

        // Save in cache
        const placesTopCache = { data: placesTopRes };
        myCache.set(key, placesTopCache, config.TTL );

        // Response to client
        return res.status(config.STATUS.OK).send({
          message: config.RES.OK,
          result: placesTopRes
        });
      }
    }
  );

});

module.exports = router;