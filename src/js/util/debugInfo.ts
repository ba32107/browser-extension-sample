import * as browser from 'webextension-polyfill'
import { ISettings, getSettings } from '../settings/settings'
import GitCommitHash from './buildInfo'

interface EnvInfo {
    extensionVersion: string,
    gitCommitHash: string,
    os: string,
    userAgent: string,
}

type DebugInfo = EnvInfo & {
    settings: ISettings,
}

export default async function getDebugInfo() {
    const settings: ISettings = await getSettings()

    const envInfo: EnvInfo = {
        extensionVersion: browser.runtime.getManifest().version,
        gitCommitHash: GitCommitHash,
        os: (await browser.runtime.getPlatformInfo()).os,
        userAgent: window.navigator.userAgent,
    }

    const debugInfo: DebugInfo = {...envInfo, ...{ settings: settings }}

    return JSON.stringify(debugInfo, null, 2)
}
