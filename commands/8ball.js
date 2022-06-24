const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    description: "8ball command",
    usage: "[question]",
    permission: null,
    guild: false,
    run: async (bot, message, args) => {
        // Check if the argument array exists, if not let the user know they're missing the question
        if (!args) return bot.utils.softErr(bot, message, "Missing a question..")
        // Join the array to turn it into a string
        const question = args.join(" ");
        // Check if the message ends with a question mark, otherwise classify it as not asking a question
        if (!question.endsWith("?")) return bot.utils.softErr(bot, message, "You're not asking a question.")
        // 2d array to include a color with an answer
        const response = [
            ["Yes", 0x00ff00],
            ["Probably", 0xb1ff00],
            ["Maybe", 0xffff00],
            ["Probably not", 0xff9f00],
            ["No", 0xff0000]
        ];
        const [answer, color] = response[Math.floor(Math.random() * response.length)];
	// Create a new embed with the question, author, color, answer and then add a timestamp
        const embed = new MessageEmbed()
        .setTitle(question)
        .setAuthor({
            name: message.author.tag,
            iconURL: message.author.displayAvatarURL()
        })
        .setColor(color)
        .setDescription(answer)
        .setTimestamp();
	// Send the message
	bot.utils.replyEmbed(bot, message, [embed]);
    }
}
