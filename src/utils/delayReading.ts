import { Message } from "../types";


function delayReading(message: Message): Promise<void> {
    return new Promise((res,) => {
        const textCount = message.content.reduce((acc, content) => acc = acc + content.text.value.length, 0);
        const miliseconds = textCount * 100;
        setTimeout(() => {
            res();
        }, miliseconds);
    });
}
export default delayReading;