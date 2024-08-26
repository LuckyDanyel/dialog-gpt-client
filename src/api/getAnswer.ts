import { CHAT_GPT_DOMAIN } from "./constants";
import { Message } from "../types";

const data: Message = {
    'id': '123213',
    "created_at": 1723388331,
    "role": "assistant",
    "content": [
        {
            "type": "text",
            "text": {
                "value": "Я могу помочь вам с различными вопросами, связанными с стоматологической клиникой",
                "annotations": []
            }
        }
    ],
}

export default async function(): Promise<Message> {
    try {
        // return new Promise((res) => {
        //     setTimeout(() => {
        //         res(data);
        //     }, 7000);
        // });
        const url = `${CHAT_GPT_DOMAIN}/api/assistant/answer`;
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            },
            credentials: 'include',
        });
        const message = await data.json() as Message;
        return message;
    } catch (error) {
        throw error;
    }
}