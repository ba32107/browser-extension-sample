import * as browser from 'webextension-polyfill'
import logger from './logging/logger'
import GitCommitHash from './util/buildInfo'
import * as env from './util/env'

async function startup() {
    logger.info(`Extension started. Commit hash: ${GitCommitHash}, dev build: ${await env.isDevEnv()}, is Firefox: ${await env.isFirefox()}`)
}

browser.runtime.onInstalled.addListener(async () => {
    await startup()
})

browser.runtime.onStartup.addListener(async () => {
    await startup()
})
