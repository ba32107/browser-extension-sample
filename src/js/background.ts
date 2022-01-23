import * as browser from "webextension-polyfill"
import logger from "./logger"

browser.runtime.onInstalled.addListener(() => {
    logger.info("Extension installed")
})
