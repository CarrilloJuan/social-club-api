import users from './routes/users';
import activities from './routes/activities';
import members from './routes/members';
import express from 'express';

const app = express();

app.use('/users', users);
app.use('/members', members);
app.use('/activities', activities);

export default app;
