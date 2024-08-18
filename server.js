import express from 'express';
import fs from 'fs';
import 'dotenv/config'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const app = express();
const port = 3005;
const domain = process.env.VITE_CHAT_GPT_DOMAIN_CLIENT;
// API маршрут для отдачи JS файла
app.get('/dialog/script', (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const assets = path.join(__dirname, '/dist/assets/js');
        const jsFiles = fs.readdirSync(assets);
        const mainFile = jsFiles.find((file) => file.includes('main'));
        if(!mainFile) throw new Error('js файл не был найден');
        res.send(`${domain}/assets/js/${mainFile}`);
    } catch (error) {
        res.send('Ошибка').status(500);
    }
});

app.use(express.static('dist'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});