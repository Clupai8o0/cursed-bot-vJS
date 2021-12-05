const { bodyTypesEmbed } = require("../helpers/embed");

module.exports = {
	name: "help",
	aliases: ["h", "Help"],
	category: "Help",
	description: "Shows help menu",

	expectedArgs: "<question>",
	minArgs: 1,
	maxArgs: 1,

	slash: "both",
	cooldown: "2s",
	hidden: false,
	ownerOnly: false,
	testOnly: true, //todo change to false
	guildOnly: false,
	options: [
		{
			name: "question",
			description: "What is the question?",
			required: true,
			type: 3,
			choices: [
				{
					name: "Body type",
					value: "body_type",
				},
			],
		},
		// {
		// 	name: "options",
		// 	description: "What exactly is the question?",
		// 	required: true,
		// 	type: 3,
		// 	choices: [
		// 		// {
		// 		// 	name: "A",
		// 		// 	value: "a",
		// 		// },
		// 		// {
		// 		// 	name: "B",
		// 		// 	value: "b",
		// 		// },
		// 		{
		// 			name: "C",
		// 			value: "c",
		// 		},
		// 		{
		// 			name: "D",
		// 			value: "d",
		// 		},
		// 	],
		// },
	],
	callback: ({ message, interaction, args }) => {
		const what = args[0];
		if (what === "body_type") {
			if (message) message.reply({ embeds: [bodyTypesEmbed] });
			if (interaction) interaction.reply({ embeds: [bodyTypesEmbed] });
		}
		// switch (what) {
		// 	case "body_type":
		// 		return { embeds: [bodyTypesEmbed] };
		// 	default:
		// 		break;
	},
};
