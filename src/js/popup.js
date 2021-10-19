const browser = require("webextension-polyfill");
// var logger = require('./logger.js')
// const getLogger = require('webpack-log');
// const log = getLogger({ name: 'webpack-batman', level: 'debug' });

const log = require("loglevel").getLogger("popup");

window.myButton.onclick = function () {
    // log.setLevel("error");
    // log.debug("hello info");
    log.info('INFO Jingle Bells, Batman Smells');
log.warn('WARN Robin laid an egg');
log.error('ERROR The Batmobile lost a wheel');
log.debug('DEBUG And the Joker got away');
    browser.notifications.create(null, {
        type: "basic",
        iconUrl: "icon32.png",
        title: "Browser extension template",
        message: "Hello World!"
    });
};
