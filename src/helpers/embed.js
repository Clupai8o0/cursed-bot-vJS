const { MessageEmbed } = require("discord.js");

const bodyTypesEmbed = new MessageEmbed()
	.setColor("#191919")
	.setTitle("Body Types")
	.setDescription(
		"The body type decides how your stats would be divided as you create a new player..."
	)
	.setAuthor(
		"Clupai",
		"https://i.pinimg.com/564x/1f/62/12/1f6212fd712566bea224b25629c38137.jpg"
	)
	.setImage(
		"https://cdn.jefit.com/wp/wp-content/uploads/2017/10/The-Three-Different-Body-Types-and-How-They-Affect-Your-Training.jpg"
	)
	.addFields(
		{
			name: "Ectomorph",
			value: "Attack: 10\nDefence: 5\nSpeed: 15",
			inline: true,
		},
		{
			name: "Mesomorph",
			value: "Attack: 10\nDefence: 10\nSpeed: 10",
			inline: true,
		},
		{
			name: "Endomorph",
			value: "Attack: 10\nDefence: 15\nSpeed: 5",
			inline: true,
		}
	)
	.setFooter("Can only be set once...");

module.exports = { bodyTypesEmbed };
