// receiver.js
import { app } from './index.mjs';
import { commandsLookup } from './commands.js';

export function receiver(token) {
  app.post('/' + token, (req, res) => {
    const text = req.body.text || '';
    const commandParts = text.split(' ');
    
    if (commandParts[0] === 'BORG' && commandParts[1] in commandsLookup) {
      // Pass bot_id from environment variables along with token and group_id
      const bot_id = process.env.BOT_ID || null;

      commandsLookup[commandParts[1]].call(text, {
        token: token,
        gid: req.body.group_id,
        bot_id: bot_id
      });
    }
    res.status(200).send('OK');
  });
}
