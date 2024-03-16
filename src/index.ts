import express from 'express';
import { profileRouter } from './profile/router';

export const app = express();
app.use(express.json());

app.get('/', (_, res) => {
  res.send('oi hi mark!');
});

app.use('/profile', profileRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🐐 Server running on ${port}`);
});
