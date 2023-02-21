import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import db from './db.js';
import router from './routes/index.js';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5000 || process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

const start = async () => {
    try {
        await db.authenticate();
        await db.sync();
        app.listen(PORT, (err) => err ? console.log(err) : console.log(`Server has started on port: ${PORT}`));
    } catch (error) {
        console.log(error);
    };
};

start();