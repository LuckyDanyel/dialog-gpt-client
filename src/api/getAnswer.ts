import Cookies from "js-cookie";
import { cookieDialogId } from "./constants";
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

export default async function(): Promise<Message[]> {
    try {
        // return new Promise((res) => {
        //     setTimeout(() => {
        //         res([data]);
        //     }, 7000);
        // });
        const url = `${import.meta.env.VITE_SERVER_URL}/api/assistant/answer`;
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: Cookies.get(`${cookieDialogId}`) || '',
            }),
            credentials: 'include',
        });
        const message = await data.json() as Message[];
        return message;
    } catch (error) {
        throw error;
    }
}