


function delayBeforeReading(): Promise<void> {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res();
        }, 5000);
    });
}
export default delayBeforeReading;