import { ISettings, getSettings } from '../settings/settings'
import GitCommitHash from './buildInfo'
import { getOperatingSystem, getVersion } from './env'

interface EnvInfo {
    extensionVersion: string,
    gitCommitHash: string,
    os: string,
    userAgent: string,
}

type DebugInfo = EnvInfo & {
    settings: ISettings,
}

export default async function getDebugInfo(): Promise<string> {
    const settings: ISettings = await getSettings()

    const envInfo: EnvInfo = {
        extensionVersion: getVersion(),
        gitCommitHash: GitCommitHash,
        os: await getOperatingSystem(),
        userAgent: window.navigator.userAgent,
    }

    const debugInfo: DebugInfo = {...envInfo, ...{ settings: settings }}

    return JSON.stringify(debugInfo, null, 2)
}
