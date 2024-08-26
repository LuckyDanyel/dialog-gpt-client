import { CHAT_GPT_DOMAIN } from "./constants";
import { Message } from "../types";

// export default async function(): Promise<Message[]> {
//     try {
//         const url = `${CHAT_GPT_DOMAIN}/api/dialog/messages`;
//         const data = await fetch(url, {
//             headers: {
//                 'Content-type': 'aplication/json',
//                 'Accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
//             },
//             credentials: 'include',
//         });
//         return data.json();
//         // return [];

//     } catch (error) {
//         throw error;
//     }
// }


export default async function(): Promise<Message[]> {
    try {
        return new Promise((res, rej) => {
            const idMessage = Date.now();
            const iframe = document.querySelector('iframe');
            iframe?.contentWindow?.postMessage({ id: idMessage, message: 'Сообщение' }, '*');
            window.addEventListener('message', (event) => {
                const { id } = event.data;
                if(id === idMessage) {
                    console.log(idMessage);
                    res([]);
                }
            });
        });
        // return [];

    } catch (error) {
        throw error;
    }
}