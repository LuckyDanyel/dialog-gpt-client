import { CHAT_GPT_DOMAIN } from "./constants";
import { Message } from "../types";

export default async function(): Promise<Message[]> {
    try {
        const url = `${CHAT_GPT_DOMAIN}/api/dialog/messages`;
        const data = await fetch(url, {
            headers: {
                'Content-type': 'aplication/json',
                'Accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            },
            credentials: 'include',
        });
        return data.json();
        // return [];

    } catch (error) {
        throw error;
    }
}