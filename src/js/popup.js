const browser = require("webextension-polyfill");
const log = require("./logger.js").log;

window.myButton.onclick = function () {
    log.info("Button clicked");

    browser.notifications.create(null, {
        type: "basic",
        iconUrl: "icon32.png",
        title: "Browser extension template",
        message: "Hello World!"
    });
};
