var config = new Object();

config.RES = {
  ERROR_DATABASE: 'Error in database',
  NO_VALID: 'Inputs no valid',
  MISSING_PARAMETERS: 'Missing parameters',
  OK: 'OK'
};

config.STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500
};

config.TTL = 3600;

module.exports = config;