import { Message } from "../types";


function delayReading(message: Message): Promise<void> {
    return new Promise((res, rej) => {
        const textCount = message.content.reduce((acc, content) => acc = acc + content.text.value.length, 0);
        const miliseconds = textCount * 30;
        setTimeout(() => {
            res();
        }, 5000);
    });
}
export default delayReading;