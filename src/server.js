import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const app = express();
const port = 3005;

// API маршрут для отдачи JS файла
app.get('/dialog/script', (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const assets = path.join(__dirname, '../dist/assets/js');
        const jsFiles = fs.readdirSync(assets);
        const mainFile = jsFiles.find((file) => file.includes('main'));
        if(!mainFile) throw new Error('js файл не был найден');
        const filePath = path.join(assets, mainFile);
        res.sendFile(filePath);
    } catch (error) {
        res.send('Ошибка').status(500);
    }
});

// Статические файлы (например, для отдачи HTML)
app.use(express.static('static'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});