import { CHAT_GPT_DOMAIN } from "./constants";
import { Message, Quiestion } from "../types";

const message = {
    "id": "msg_szAmsN1gW6nCv7fpMfQsC3nb",
    "object": "thread.message",
    "created_at": 1723815391,
    "assistant_id": null,
    "thread_id": "thread_S8xyYJDczGoRHk4cQJq5i9gE",
    "run_id": null,
    "role": "user",
    "content": [
        {
            "type": "text",
            "text": {
                "value": "Привет\n",
                "annotations": []
            }
        }
    ],
    "attachments": [],
    "metadata": {}
}

export default async function(quiestions: Quiestion[]): Promise<Message> {
    try {

        // return new Promise((res, rej) => {
        //     setTimeout(() => {
        //         res(message as any);
        //     }, 2000);
        // });


        const url = `${CHAT_GPT_DOMAIN}/api/dialog/messages`;
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(quiestions),
        });
        return data.json();

    } catch (error) {
        throw error;
    }
}