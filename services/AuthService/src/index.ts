import * as express from 'express';
import cors from 'cors';

const app = express.default();

app.use(cors({
    origin: '*',
}))

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.listen(4000, () => {
    console.log('Listening on port 4000');
}
);

