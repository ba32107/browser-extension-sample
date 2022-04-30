export async function waitForCondition(condition: () => boolean): Promise<void> {
    return new Promise(resolve => {
        const poll = setInterval(function() {
            if (condition()) {
                clearInterval(poll)
                resolve()
            }
        }, 100)
    })
}

export async function sleep(millis: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, millis))
}
