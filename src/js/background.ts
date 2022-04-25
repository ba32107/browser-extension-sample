import * as browser from "webextension-polyfill"
import logger from "./logging/logger"
import GitCommitHash from "./util/buildInfo"

function startup() {
    logger.info(`Extension started. Commit hash: ${GitCommitHash}`)
}

browser.runtime.onInstalled.addListener(() => {
    startup()
})

browser.runtime.onStartup.addListener(() => {
    startup()
})
