import { Settings } from "../types";


export default async function(): Promise<Settings> {
    try {
        const url = `${import.meta.env.VITE_SERVER_URL}/api/dialog/settings`;
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
        });
        if(data.status >= 200 && data.status < 400) {
            return data.json();
        }
        
        throw new Error();

    } catch (error) {
        throw error;
    }
}