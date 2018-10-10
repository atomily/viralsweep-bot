// # Config
// the configuration file

// defines that javascript should be executed in 'strict mode' (ECMAScript 5)
'use strict';

// import config file
const settings = require('./settings');

// combine the config file into an object
module.exports = {
    settings: settings
};