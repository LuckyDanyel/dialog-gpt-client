import { Message } from "../types";


function delayReading(message: Message): Promise<void> {
    return new Promise((res,) => {
        const textCount = message.content.reduce((acc, content) => acc = acc + content.text.value.length, 0);
        const miliseconds = textCount * 30;
        console.log(miliseconds);
        setTimeout(() => {
            res();
        }, 5000);
    });
}
export default delayReading;