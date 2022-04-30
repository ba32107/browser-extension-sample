import * as browser from 'webextension-polyfill'

export interface ISettings {
    myBooleanSetting: boolean,
    myStringSetting: string,
}

const DefaultSettings: ISettings = {
    myBooleanSetting: true,
    myStringSetting: 'Sample setting value',
}

export async function getSettings() : Promise<ISettings> {
    const settings = (await browser.storage.sync.get(['settings'])).settings

    if (!settings) {
        return DefaultSettings
    }

    loadMissingKeysFromDefault(settings)

    return {
        myBooleanSetting: settings.myBooleanSetting,
        myStringSetting: settings.myStringSetting
    }
}

export async function saveSettings(settings: ISettings): Promise<void> {
    await browser.storage.sync.set({ settings: settings })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadMissingKeysFromDefault(settings: any): void {
    for (const [key, value] of Object.entries(DefaultSettings)) {
        if (!(key in settings)) {
            settings[key] = value
        }
    }
}
