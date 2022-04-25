import * as browser from "webextension-polyfill"
import { ISettings, getSettings, saveSettings } from "./settings/settings"
import getDebugInfo from "./util/debugInfo"
import logger from "./logging/logger"

const myBooleanSetting = document.getElementById("myBooleanSetting") as HTMLInputElement
const myStringSetting = document.getElementById("myStringSetting") as HTMLInputElement
const saveButton = document.getElementById("saveButton") as HTMLButtonElement
const debugInfoButton = document.getElementById("debugInfoButton") as HTMLButtonElement

window.onload = async function() {
    const settings: ISettings = await getSettings()

    myBooleanSetting.checked = settings.myBooleanSetting
    myStringSetting.value = settings.myStringSetting
}

saveButton.onclick = async function () {
    logger.info("Saving settings")

    const newSettings: ISettings = {
        myBooleanSetting: myBooleanSetting.checked,
        myStringSetting: myStringSetting.value,
    }

    await saveSettings(newSettings)

    browser.notifications.create(undefined, {
        type: "basic",
        iconUrl: "icon32.png",
        title: "Browser extension template",
        message: "Settings saved"
    })
}

debugInfoButton.onclick = async function() {
    const debugInfo = await getDebugInfo()
    await navigator.clipboard.writeText(debugInfo)
}
