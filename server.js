import express from 'express';
import cors from 'cors';
import 'dotenv/config'

const app = express();
const port = 3005;

app.use(cors());
app.use(express.static('dist'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});