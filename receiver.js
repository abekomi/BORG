import { app } from "./index.js";
import { commandsLookup } from "./commands.js";

export function receiver(token, botId) {
  app.post("/" + token, function (req, res) {
    const command = req.body.text.split(" ");

    if (command[0] === "BORG" && command[1] in commandsLookup) {
      commandsLookup[command[1]].call(command.slice(2).join(" "), {
        token: token,
        bot_id: botId,
        gid: req.body.group_id
      });
    }

    res.sendStatus(200);
  });
}
