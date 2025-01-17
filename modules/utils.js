import { MessageEmbed } from 'discord.js';
import { Readable } from 'stream';

async function reply(bot, message, content) {
	message
		.reply(content)
		.catch(() => message.channel.send(content).catch((err) => console.log(err)),
		);
}
async function replyEmbed(bot, message, embeds) {
	message
		.reply({ embeds: embeds })
		.catch(() => message.channel
			.send({ embeds: embeds })
			.catch((err) => bot.logger.err(bot, err)),
		);
}
async function softErr(bot, message, err, loadingMsg = null) {
	const embed = new MessageEmbed()
		.setTitle(bot.consts.Text.SOFT_ERR_TITLE)
		.setColor(bot.consts.Colors.SOFT_ERR)
		.setDescription(err)
		.setAuthor({
			name: message.author.tag,
			iconURL: message.author.displayAvatarURL(),
		})
		.setTimestamp();

	loadingMsg
		? loadingMsg.edit({ embeds: [embed] })
		: bot.utils.replyEmbed(bot, message, [embed]);
}
async function handleCmdError(bot, message, loadingMsg, err) {
	// Make the error a string
	err = err.toString();
	// Warn with the error
	bot.logger.warn(bot, err);
	// Soft error with the error
	bot.utils.softErr(bot, message, err, loadingMsg);
}
async function cmdLoadingMsg(bot, message) {
	const embed = new MessageEmbed()
		.setTitle('Command is processing..')
		.setImage('https://c.tenor.com/XasjKGMk_wAAAAAC/load-loading.gif')
		.setFooter({
			text: 'Please be patient!',
		})
		.setColor(bot.consts.Colors.PROMPT)
		.setAuthor({
			name: message.author.tag,
			iconURL: message.author.displayAvatarURL(),
		});

	const msg = await message.channel.send({ embeds: [embed] });
	return msg;
}
async function bufToImgurURL(bot, buffer) {
	const imgStream = Readable.from(buffer);
	const res = await bot.imgur
		.upload({
			image: imgStream,
			type: 'stream',
		})
		.catch((err) => bot.logger.err(bot, err));

	return res.data.link;
}
function arrToCsv(arr) {
	return arr.join(',');
}
function csvToArr(csv) {
	return csv.split(',');
}
function putIfAbsent(arr, obj) {
	if (!arr.includes(obj)) {
		arr.push(obj);
	}
}

export default { reply, replyEmbed, softErr, handleCmdError, cmdLoadingMsg, bufToImgurURL, arrToCsv, csvToArr, putIfAbsent };
