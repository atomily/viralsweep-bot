// # Command Line Interface
// sets up the Command Line Interface

// defines that javascript should be executed in 'strict mode' (ECMAScript 5)
'use strict';

// import dependencies
const logger = require('../logger')('cli');
const config = require('../config');
const Bot = require('../bot');

// # Initialize
// prints a initialize screen to show that the client has started
logger.normal("------------------------");
logger.normal("Viralsweep Raffle Destroyer");
logger.normal("Developed by: Vlad");
logger.normal(`version: ${String(config.settings.version)}`);
logger.normal("------------------------");

// # Validation
// validate the config file
try {
    const viralsweep = config.settings.viralsweep;
    const email = config.settings.email;
    const sizes = config.settings.sizes;

    // print success due to the fact that its all validated
    logger.green('Successfully validated the config');
    logger.normal("------------------------");
} catch (err) {
    logger.red('sorry. the file you specified is not existing or not a valid JSON file.');
    process.exit();
};

// # Bot
// initializes the new bot 
const bot = new Bot({
    email: config.settings.email,
    sizes: config.settings.sizes,
    viralsweep: config.settings.viralsweep
});

bot.init();