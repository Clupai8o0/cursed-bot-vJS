const colors = require("colors");
const WOKCommands = require("wokcommands");
const path = require("path");
const { prefix, activities } = require("../../json/config.json");

module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		const i = Math.floor(Math.random() * activities.length)
		client.user.setPresence({
			activities: [{ name: activities[i].activity, type: activities[i].type }],
			status: "dnd",
		});

		const dbOptions = {
			keepAlive: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		}
		new WOKCommands(client, {
			commandsDir: path.join(__dirname, "../commands"),
			featuresDir: path.join(__dirname, "../features"),
			showWarns: true,
			botOwners: "774310307043737674",
			mongoUri: process.env.MONGODB_URL,
			testServers: ["905716092314484756"],
			//todo uncomment
			// dbOptions
		})
			.setDefaultPrefix(prefix)
			.setColor(0x060606)
			.setCategorySettings([
				{
					name: "Help",
					emoji: "😅",
				},
			]);

		console.log(colors.blue("Cursed is online!"));
	},
};
