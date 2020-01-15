import activities from './routes/activities';
import members from './routes/members';
import express from 'express';

const app = express();

app.use('/members', members);
app.use('/activities', activities);

export default app;
