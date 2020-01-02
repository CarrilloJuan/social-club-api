import { user } from './routes';
import express from 'express';

const app = express();

app.use('/user', user);

export default app;
