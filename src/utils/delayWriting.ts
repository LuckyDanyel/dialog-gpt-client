import { Message } from "../types";

function delayWriting(message: Message[]): Promise<void> {
    return new Promise((res) => {
        const textCount = message[0].content.reduce((acc, content) => acc = acc + content.text.value.length, 0);
        const miliseconds = textCount * 30;
        setTimeout(() => {
            res();
        }, miliseconds);
    });
}
export default delayWriting;