import { Message } from "../types";

function delayWriting(message: Message): Promise<void> {
    return new Promise((res) => {
        const textCount = message.content.reduce((acc, content) => acc = acc + content.text.value.length, 0);
        const miliseconds = textCount * 50;
        setTimeout(() => {
            res();
        }, miliseconds);
    });
}
export default delayWriting;