export function receiver(token) {
  app.post('/' + token, (req, res) => {
    console.log("Received request at /" + token);
    console.log("Request body:", req.body);

    const text = req.body.text || '';
    const commandParts = text.split(' ');

    console.log("Command parts:", commandParts);

    if (commandParts[0] === 'BORG' && commandParts[1] in commandsLookup) {
      console.log("Command found:", commandParts[1]);
      const bot_id = process.env.BOT_ID || null;

      commandsLookup[commandParts[1]].call(text, {
        token: token,
        gid: req.body.group_id,
        bot_id: bot_id
      });
    } else {
      console.log("No matching command or invalid command format.");
    }

    res.status(200).send('OK');
  });
}
