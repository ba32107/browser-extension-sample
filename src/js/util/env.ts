import * as browser from 'webextension-polyfill'

declare const __PRODUCTION__: boolean
export const IsProduction = __PRODUCTION__

export async function isFirefox(): Promise<boolean>  {
    if (browser.runtime.getBrowserInfo) {
        const browserInfo = await browser.runtime.getBrowserInfo()
        return browserInfo.name.toLowerCase().includes('firefox')
    }

    return false
}

export async function getOperatingSystem(): Promise<string>  {
    return (await browser.runtime.getPlatformInfo()).os
}

export function getVersion(): string {
    return browser.runtime.getManifest().version
}
