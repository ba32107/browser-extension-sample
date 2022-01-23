import * as browser from "webextension-polyfill"
import logger from "./logger"

const myButton = document.getElementById("myButton") as HTMLButtonElement

myButton.onclick = function () {
    logger.info("Button clicked")

    browser.notifications.create(undefined, {
        type: "basic",
        iconUrl: "icon32.png",
        title: "Browser extension template",
        message: "Hello World!"
    })
}
