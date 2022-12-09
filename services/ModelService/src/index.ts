import * as express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { trainModel } from './controllers/trainModel';

dotenv.config();

const app = express.default();

// Middlewares
app.use(cors({
    origin: '*',
}))

app.use(express.json());


// Routes
app.post('/model/',trainModel)

// Start the server
if(!process.env.PORT) {
    throw new Error('Please specify a valid port as an environnement variable');
}

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

