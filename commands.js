// commands.js
import fetch from 'node-fetch';

export const commandsLookup = {
  hello: {
    call: (text, { bot_id }) => {
      send(bot_id, "👋 Hello, I am BORG.");
    }
  },

  time: {
    call: (text, { bot_id }) => {
      const now = new Date().toLocaleString();
      send(bot_id, `🕒 Current time: ${now}`);
    }
  },

  flip: {
    call: (text, { bot_id }) => {
      const result = Math.random() > 0.5 ? 'Heads' : 'Tails';
      send(bot_id, `🪙 Coin flip: ${result}`);
    }
  },

  roll: {
    call: (text, { bot_id }) => {
      const roll = Math.floor(Math.random() * 6) + 1;
      send(bot_id, `🎲 You rolled a ${roll}`);
    }
  },

  echo: {
    call: (text, { bot_id }) => {
      const message = text.split(' ').slice(2).join(' ') || '...';
      send(bot_id, `🗣️ ${message}`);
    }
  },

  help: {
    call: (text, { bot_id }) => {
      const cmds = Object.keys(commandsLookup).join(', ');
      send(bot_id, `📜 Commands: ${cmds}`);
    }
  }
};

// helper function
function send(bot_id, message) {
  fetch('https://api.groupme.com/v3/bots/post', {
    method: 'POST',
    body: JSON.stringify({
      bot_id,
      text: message
    }),
    headers: { 'Content-Type': 'application/json' }
  }).catch(err => console.error("Failed to send message:", err));
}
