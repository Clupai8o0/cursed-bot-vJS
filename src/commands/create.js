const Filter = require("bad-words"),
	filter = new Filter();
const { findPlayerName, createPlayer, findPlayer } = require("../db/player.js");
const colors = require("colors");
const { SUCCESS, ERROR } = require("../helpers/constants");
const {
	MessageEmbed,
	MessageActionRow,
	MessageSelectMenu,
} = require("discord.js");
const cap = require("../helpers/capitalize");

const { player_data, elements } = require("../../json/player.json");

/*
module.exports = {
	name: "create",
	aliases: ["c", "Create", "start"],
	category: "Player",
	description: "Creates a character that interacts with the cursed world.",

	expectedArgs: "<name>",
	minArgs: 1,
	maxArgs: 1,
	syntaxError:
		"Idk what you did wrong but make it something like this '~create Elutheus'",

	cooldown: "2s", //todo edit cooldown
	hidden: false,
	ownerOnly: false,
	testOnly: true, //todo change to false
	guildOnly: true,
	slash: "both",
	options: [
		{
			name: "character_name",
			description: "Name of your character",
			required: true,
			type: 3,
		},
	],

	callback: async ({ args, interaction, message, client }) => {
		const name = args[0];
		if (filter.isProfane(name))
			return "Bro you can't have a bad word as your name...";

		const response = await findPlayerName(name);
		if (response.type === ERROR) {
			console.error(
				colors.red("Error while trying to get player (create player)")
			);
			return "There was an error while trying to create player";
		}
		if (
			response.type === SUCCESS &&
			response.data !== null &&
			response.data !== undefined
		) {
			return `"${name}" has already been taken, choose another name bro...`;
		}

		if (interaction) {
			interaction.reply("Choose a gender").then(() => {
				const filter = (m) => interaction.user.id === m.author.id;

				interaction.channel
					.awaitMessages({ filter, time: 30000, max: 1, errors: ["time"] })
					.then((msgs) => {
						const gender = msgs.first().content;
						if (gender !== "male" && gender !== "female") {
							interaction.followUp(
								`Aye yo bro the gender has to either be male or female not ${gender}`
							);
							return;
						}
						interaction.followUp({
							embeds: [
								new MessageEmbed()
									.setColor("#191919")
									.setTitle("Choose a body type")
									.setDescription("Selecting a body type"),
							],
							components: [
								new MessageActionRow().addComponents(
									new MessageSelectMenu()
										.setCustomId("select_body_type")
										.setPlaceholder("Choose a body type")
										.addOptions([
											{
												label: "Ectomorph",
												description: "Ectomorph body type",
												value: "ecto",
											},
											{
												label: "Mesomorph",
												description: "Mesomorph body type",
												value: "meso",
											},
										])
								),
							],
						});
					})
					.catch(() => {
						interaction.followUp("You did not enter any input...");
					});
			});
		}

		if (client) {
			client.on("interactionCreate", async (interactionTemp) => {
				if (!interactionTemp.isSelectMenu()) return console.log("Oh fuk".red);

				if (interactionTemp.customId === "select_body_type") {
					console.log("Till here atleast".red);
					const filter = (i) =>
						i.customId === "select_body_type" &&
						interactionTemp.user.id === i.user.id;
					const collector = interaction.channel.createMessageComponentCollector(
						{ filter, time: 30000 }
					);

					collector.on("collect", (i) => {
						console.log("shet it wroked".rainbow);
						console.log(i);
					});
				}
			});
		}

		// return `Dis wat i got ${response.info}`;
	},
};
*/

module.exports = {
	name: "create",
	aliases: ["c", "Create", "start"],
	category: "Player",
	description: "Creates a character that interacts with the cursed world.",

	// expectedArgs: "<character-name>",
	// minArgs: 1,
	// maxArgs: 1,
	// syntaxError:
	// 	"Idk what you did wrong but make it something like this '~create Elutheus'",

	// cooldown: "2s", //todo edit cooldown
	// hidden: false,
	// ownerOnly: false,
	// testOnly: true, //todo change to false
	// guildOnly: true,
	// slash: false,
	// options: [
	// 	{
	// 		name: "character_name",
	// 		description: "Name of your character",
	// 		required: true,
	// 		type: 3,
	// 	},
	// 	{
	// 		name: "gender",
	// 		description: "Gender of your character",
	// 		required: true,
	// 		type: 3,
	// 		choices: [
	// 			{
	// 				name: "Male",
	// 				value: "male",
	// 			},
	// 			{
	// 				name: "Female",
	// 				value: "female",
	// 			},
	// 		],
	// 	},
	// 	{
	// 		name: "body_type",
	// 		description: "Body type of your character",
	// 		required: true,
	// 		type: 3,
	// 		choices: [
	// 			{
	// 				name: "Ectomorph",
	// 				value: "ecto",
	// 			},
	// 			{
	// 				name: "Mesomorph",
	// 				value: "meso",
	// 			},
	// 			{
	// 				name: "Endomorph",
	// 				value: "endo",
	// 			},
	// 		],
	// 	},
	// ],

	callback: async ({ args, interaction, message }) => {
		console.log("Reached!");
		if (message) {
			message.reply("Here!");
		}

		return;

		const name = args[0];
		const gender = args[1];
		const bodyType = args[2];

		//* checking if player already has character
		const test = await findPlayer(interaction.user.id);
		if (test.type === SUCCESS && test.data) {
			return `You already have a player **${cap(test.data.name)}**`;
		}

		//* Checking if name has bad words in it
		if (filter.isProfane(name))
			return "Bro you can't have a bad word as your name...";

		//* Checking if name is already taken
		const response = await findPlayerName(name);
		if (response.type === ERROR) {
			console.error(
				colors.red(
					`Error while trying to get player (create player) \n${info} \n${data}`
				)
			);
			return "There was an error while trying to create player";
		}
		if (
			response.type === SUCCESS &&
			response.data !== null &&
			response.data !== undefined
		) {
			return `"${name}" has already been taken, choose another name bro...`;
		}

		if (interaction) {
			const player = { ...player_data };

			player.id = interaction.user.id;
			player.name = name.toLowerCase();
			player.gender = gender;
			player.body_type = bodyType;

			const max = 100,
				min = 30;
			const points = Math.floor(Math.random() * (max - min + 1) + min);
			switch (bodyType) {
				case "ecto":
					player.status.atk = Math.floor(points * 0.333);
					player.status.def = Math.floor(points * 0.166);
					player.status.spd = Math.floor(points * 0.5);
					break;
				case "meso":
					player.status.atk = Math.floor(points * 0.333);
					player.status.def = Math.floor(points * 0.333);
					player.status.spd = Math.floor(points * 0.333);
					break;
				case "endo":
					player.status.atk = Math.floor(points * 0.333);
					player.status.def = Math.floor(points * 0.5);
					player.status.spd = Math.floor(points * 0.166);
					break;
				default:
					break;
			}

			player.element = elements[Math.floor(Math.random() * elements.length)];
			const response2 = await createPlayer(player);

			if (response2.type === SUCCESS)
				interaction.reply("Successfully created player");
			else {
				console.log(colors.red(`${response2.info}\n${response2.data}`));
				interaction.reply("There was an error");
			}
		}

		// return `Dis wat i got ${response.info}`;
	},
};
