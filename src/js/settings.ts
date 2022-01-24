import * as browser from "webextension-polyfill"

export interface ISettings {
    option1: boolean,
    option2: string
}

const DefaultSettings: ISettings = {
    option1: true,
    option2: "defaultValue",
}

export async function getSettings(): Promise<ISettings> {
    const settings = (await browser.storage.sync.get(["settings"])).settings

    if (!settings) {
        return DefaultSettings
    }

    loadMissingKeysFromDefault(settings)

    return {
        option1: settings.option1,
        option2: settings.option2
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
