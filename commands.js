// commands.js
import fetch from 'node-fetch'; // or your preferred HTTP client

export let commandsLookup = {};

/** The template for BORG commands */
export class Command {
  /**
   * 
   * @param {[string]} aliases - The names of the command
   * @param {RegExp} parameters - A regex to match command parameters
   * @param {function} callback - The function to run when the command is called
   */
  constructor(aliases, parameters, callback) {
    this.parameters = parameters;
    this.callback = callback;
    for (let i in aliases) commandsLookup[aliases[i]] = this;
  }

  call(parameterstring, receiver) {
    if (this.parameters.test(parameterstring)) this.callback(this.parameters.exec(parameterstring), receiver);
  }
}

/**
 * Example function to send a message to GroupMe using bot ID and token
 * @param {string} bot_id 
 * @param {string} text 
 */
async function sendMessage(bot_id, text) {
  const url = 'https://api.groupme.com/v3/bots/post';
  const body = {
    bot_id,
    text
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      console.error('Failed to send message:', response.statusText);
    }
  } catch (err) {
    console.error('Error sending message:', err);
  }
}

// Sample command that replies "Hello, World!"
new Command(
  ['hello', 'hi'],             // aliases
  /^BORG (hello|hi)$/i,        // regex to match "BORG hello" or "BORG hi"
  (matchGroups, receiver) => { // callback
    const bot_id = receiver.bot_id;
    sendMessage(bot_id, "Hello, World!");
  }
);
