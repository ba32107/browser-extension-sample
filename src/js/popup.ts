import * as browser from "webextension-polyfill"
import logger from "./logger"
import { getSettings, ISettings, saveSettings } from "./settings"

const option1Checkbox = document.getElementById("option1Checkbox") as HTMLInputElement
const option2TextField = document.getElementById("option2TextField") as HTMLInputElement
const saveButton = document.getElementById("saveButton") as HTMLButtonElement

window.onload = async function () {
    const settings = await getSettings()

    option1Checkbox.checked = settings.option1
    option2TextField.value = settings.option2
}

saveButton.onclick = async function () {
    logger.info("Save button clicked")

    const newSettings: ISettings = {
        option1: option1Checkbox.checked,
        option2: option2TextField.value
    }

    await saveSettings(newSettings)

    browser.notifications.create(undefined, {
        type: "basic",
        iconUrl: "icon32.png",
        title: "Browser extension template",
        message: "Settings saved"
    })
}
