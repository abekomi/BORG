import { app } from "./index.js";
import { commandsLookup } from "./commands.js";

export function receiver(token) {
	app.post("/" + token, function (req, resp) {
		let command = req.body.text.split(" ");
		if (command[0] === "BORG" && command[1] in commandsLookup) {
			commandsLookup[command[1]]({
				token: token,
				gid: req.body.group_id,
			});
		}
	});
}
