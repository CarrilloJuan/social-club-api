import { members, activities } from './routes';
import express from 'express';

const app = express();

app.use('/members', members);
app.use('/activities', activities);

export default app;
