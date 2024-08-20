


function delayBeforeReading(): Promise<void> {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, 5000);
    });
}
export default delayBeforeReading;