


function delayBeforeReading(): Promise<void> {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, 1500);
    });
}
export default delayBeforeReading;