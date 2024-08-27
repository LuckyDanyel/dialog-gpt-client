import Cookies from "js-cookie";
import { CHAT_GPT_DOMAIN, cookieDialogId } from "./constants";
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

const dayMilliseconds = 24 * 60 * 60 * 1000

export default async function(quiestions: Quiestion[]): Promise<{ dialogId: string, message: Message }> {
    try {

        // return new Promise((res, rej) => {
        //     setTimeout(() => {
        //         res({ message });
        //     }, 2000);
        // });


        const url = `${CHAT_GPT_DOMAIN}/api/dialog/send-messages`;
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
            body: JSON.stringify({
                id: Cookies.get(`${cookieDialogId}`) || '',
                messages: quiestions,
            }),
        });
        const message: { dialogId: string, message: Message } = await data.json();
        const { dialogId } = message;
        if(data.status >= 200 && data.status < 400) {
            Cookies.set(cookieDialogId, dialogId, { expires: new Date(Date.now() + dayMilliseconds) });
            return message;
        }
        
        throw new Error();

    } catch (error) {
        throw error;
    }
}