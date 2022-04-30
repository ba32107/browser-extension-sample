import * as browser from 'webextension-polyfill'

declare const __PRODUCTION__: boolean
const IsProduction = __PRODUCTION__
export default IsProduction

export async function isDevEnv() {
    const extensionInfo = await browser.management.getSelf()
    return extensionInfo.installType === 'development'
}

export async function isFirefox() {
    if (browser.runtime.getBrowserInfo) {
        const browserInfo = await browser.runtime.getBrowserInfo()
        return browserInfo.name.toLowerCase().includes('firefox')
    }

    return false
}
