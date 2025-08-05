console.log('Running Node version:', process.version);

import { getData } from './utils.js';
import { receiver } from './receiver.js';
import express from 'express';
import bodyParser from 'body-parser';

export const app = express();
app.use(bodyParser.json());

const BOT_ID = process.env.BOT_ID;  // get bot id from env vars

getData((data) => {
  for (let i in data.clients) {
    // Pass both token and BOT_ID to receiver
    receiver(data.clients[i].token, BOT_ID);
  }
}, "data");

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
