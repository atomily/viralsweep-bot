const settings = {
    /**
     * version
     * the current version of the application
     * 
     * @param {String} version 0.0.1
     */
    "version": "1.0.1",
    /**
     * viralsweep api
     * the settings for the raffle entry
     * 
     * @param {String} id the raffle id
     * @param {String} entrySource the source url for the entry
     */
    "viralsweep": {
        "id": "d8fd82-42131",
        "entry_source": "https://app.viralsweep.com/view_widget/d8fd82-42131"
    },
    /**
     * email
     * the email address we use to enter raffles with (GMAIL ONLY)
     * 
     * @param {String} email
     */
    "email": "promichael01@gmail.com",
    /**
     * sizes
     * the size object has the sizes for the bot, do not change this as its dependent on the raffle itself
     * 
     * @param {Object} sizes
     */
    "sizes": ["7", "8", "9", "10", "11"]
};

module.exports = settings;