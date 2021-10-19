const browser = require("webextension-polyfill");

browser.runtime.onInstalled.addListener(() => {
    const log = require("./logger.js").log;
    log.info("Extension installed");
});
