try {
    const browser = require("webextension-polyfill");

    browser.runtime.onInstalled.addListener(details => {

        debugger;
        var log = require("loglevel").getLogger("popup");
        var qq = sdfmsd.sdfsd;
        log.error('blah');

    });
} catch (err) {
    console.error(err)
}