// # Bot
// handles the actual request to enter the entry

// defines that javascript should be executed in 'strict mode' (ECMAScript 5)
'use strict';

// import dependencies
const request = require('request-promise');
const cheerio = require('cheerio');
const crypto = require('crypto');
const faker = require('faker');
const fs = require('fs');
const path = require('path');
const logger = require('../logger')('bot');

/**
 * Bot
 */
class Bot {
    /**
     * constructor
     * 
     * @param {String} email the email address (gmail only for now)
     * @param {Object} proxies the proxy object
     * @param {Object} sizes the size object
     * @param {Object} viralsweep the viralsweep object
     * 
     * @returns null
     */
    constructor(derive) {
        this.email = derive.email;
        this.proxies = fs.readFileSync(path.join(__dirname, '../../proxies.txt'), 'utf8').split('\n');
        this.sizes = derive.sizes;
        this.viralsweep = derive.viralsweep;
    };
    /**
     * _getProxy
     * gets a truely random proxy from the users proxies & selects it
     * 
     * @return success: proxy
     */
    async _getProxy() {
        this.proxies.push(this.proxies.shift())

        return this.proxies[this.proxies.length - 1];
    };
    /**
     * init
     * initializes the bot and calls the function to enter
     * 
     * @returns entry
     */
    init() {
        setInterval(() => {
            this.enter();
        }, 500);
    };
    /**
     * enter
     * enters the raffle
     * 
     * @returns null
     */
    async enter() {
        let old = this.email.split('@gmail')[0]
        let email = old + '+' + faker.fake('{{name.firstName}}') + String(Math.random() * (9999999 - 1) + 1).split('.')[0] + '@gmail.com';
        
        let options = {
            uri: 'https://app.viralsweep.com/promo/enter',
            method: "POST",
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
                "referer": "https://app.viralsweep.com/vrlswp/widget/d8fd82-42131?rndid=715162&framed=1&ref=&hash=",
                "origin": "https://app.viralsweep.com",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            form: {
                "id": this.viralsweep.id,
                "type": "widget",
                "refer_source": "",
                "entry_sourec": "https://app.viralsweep.com/view_widget/d8fd82-42131",
                "first_name": faker.fake('{{name.firstName}}'),
                "last_name": faker.fake('{{name.lastName}}'),
                "email": email,
                "email_again": "",
                "71949_1537974557": this.sizes[Math.floor(Math.random() * this.sizes.length)],
                "agree_to_rules": "yes"
            }
        };

        if (this.proxies.length > 0) {
            let proxy = await this._getProxy();

            options.proxy = 'http://' + proxy;
        };

        try {
            let response = await request(options);

            logger.green(`Enterred the raffle: ${email}`);
            fs.appendFileSync(path.join(__dirname, './entries.txt'), email);
        } catch (err) {
            logger.red(err);
        };
    };
};

module.exports = Bot;