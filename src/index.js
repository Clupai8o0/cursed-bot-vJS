const { Client, Intents } = require("discord.js");
const { connectToServer } = require("./db/mongodb");
const colors = require("colors");
const fs = require("fs");

//? Custom functions
const { readFileSync } = require("./functions/json.js");

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	],
});

//? events
const eventFiles = fs
	.readdirSync("./src/events")
	.filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const replies = [
	"Shut up...",
	"No one cares...",
	"Damarei!",
	"Urusei Gaki!",
	"Go die...",
	"Huh?",
];

client.on("messageCreate", (msg) => {
	switch (msg.content.toLowerCase()) {
		case "hi":
			msg.reply(replies[Math.floor(Math.random() * replies.length)]);
			break;
		case "hello":
			msg.reply(replies[Math.floor(Math.random() * replies.length)]);
			break;
		case "sup":
			msg.reply(replies[Math.floor(Math.random() * replies.length)]);
			break;
		case "shut up":
			msg.reply("No you shut up!");
			break;
		case "baka":
			msg.reply("Gay...");
			break;
		default:
			break;
	}
});

connectToServer(function(err) {
	if (err) {
		console.error(colors.red(err));
		process.exit();
	}
});
client.login(process.env.TOKEN);
