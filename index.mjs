// index.mjs

console.log('Running Node version:', process.version);

import { getData } from './utils.js';
import { receiver } from './receiver.js';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

getData((data) => {
	for (let i in data.clients) {
		receiver(data.clients[i].token);
	}
}, "data");

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
