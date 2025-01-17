const description = 'Reply with to a message with given string';
const usage = '[msg id to respond to] [string to repeat]';
async function run(bot, message, args) {
	message.delete().catch();
	const targetMsgId = args.shift();
	// Get the message
	const msg = await message.channel.messages.fetch(targetMsgId);
	// Check if we got the message, if so reply to it, otherwise let the author know
	if (msg) {msg.reply(args.join(' '));}
	else {message.channel.send('Could not find message!').then(m => setTimeout(() => m.delete(), 3000));}
}

export default { description, usage, run };