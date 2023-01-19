const { MessageEmbed } = require('discord.js');
const translate = require('translate-google');

module.exports = {
	description: 'Translates a message to english',
	usage: '[text, works by replying to a message too]',
	permission: null,
	botPermissions: [],
	guild: false,
	cooldown: 3,
	run: async (bot, message, loadingMsg, args) => {
		// Check if there's a message reference or any string to translate
		if (!message.reference && !args) return bot.utils.softErr(bot, message, 'Please reply to a message or give text to translate!', loadingMsg);
		// Get message object if it exists, otherwise make it null
		const msg = message.reference ? (await message.channel.messages.fetch(message.reference.messageId)) : null;
		// Check the referenced msg content if it exists, otherwise just join the arguments to a string
		const toTranslate = msg ? msg.content : args.join(' ');
		// Translate the message
		const translated = await translate(toTranslate, { to: 'en' });
		// Create an embed with the translated message
		const embed = new MessageEmbed()
			.setTitle('Google Translate!')
			.setColor(bot.consts.Colors.TRANSLATE)
			.setAuthor({
				name: message.author.tag,
				iconURL: message.author.displayAvatarURL(),
			})
			.addFields([
				{
					name: 'Original',
					// We slice to fit the field character limit
					value: toTranslate.slice(0, 1023),
				},
				{
					name: 'Translated',
					value: translated.slice(0, 1023),
				},
			])
			.setTimestamp();
		// Edit the temp message
		loadingMsg.edit({ embeds: [embed] }).catch(err => bot.utils.handleCmdError(bot, message, loadingMsg, err));
	},
};