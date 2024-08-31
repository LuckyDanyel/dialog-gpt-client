
import Cookies from "js-cookie";
import { cookieDialogId } from "./constants";
import { Message } from "../types";


export default async function(): Promise<Message[]> {
    try {
        const url = `${import.meta.env.VITE_SERVER_URL}/api/dialog/messages`;
        const body = {
            id: Cookies.get(`${cookieDialogId}`) || '',
            messages: []
        };
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
            body: JSON.stringify(body),
        });
        return data.json();
        // return [];

    } catch (error) {
        throw error;
    }
}
