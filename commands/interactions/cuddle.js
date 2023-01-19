const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
	description: 'Cuddle a user!',
	usage: '[user]',
	permission: null,
	botPermissions: [],
	guild: true,
	cooldown: 5,
	run: async (bot, message, loadingMsg) => {
		// Verify that we have a user to hug and if it is valid
		const member = message.mentions.members.first();
		if (!member) {
			return bot.utils.softErr(
				bot,
				message,
				'Awh.. got no one to cuddle? ):',
				loadingMsg,
			);
		}
		if (member.user.id === message.author.id) {
			return bot.utils.softErr(
				bot,
				message,
				'You can\'t cuddle yourself silly!',
				loadingMsg,
			);
		}
		// Fetch the media
		const cuddle = await axios
			.get('https://api.otakugifs.xyz/gif?reaction=cuddle&format=gif')
			.then((res) => res.data.url);

		sendEmbed(bot, loadingMsg, member, message, cuddle);
	},
};

function sendEmbed(bot, loadingMsg, member, message, cuddle) {
	// Create a new embed to send
	const embed = new MessageEmbed()
		.setTitle(`${member.user.tag} got cuddled by ${message.author.tag}!`)
		.setColor(bot.consts.Colors.INFO)
		.setImage(cuddle)
		.setTimestamp();
	// Send the new embed
	loadingMsg
		.edit({ embeds: [embed] })
		.catch((err) => bot.utils.handleCmdError(bot, message, null, err));
}