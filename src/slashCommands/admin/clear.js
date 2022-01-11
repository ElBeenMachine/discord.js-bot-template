const { CommandInteraction, Client, Permissions } = require("discord.js");
const { PermissionError } = require("../../structures/Errors");
const { PlainEmbed } = require("../../utils/embeds");

module.exports = {
    name: "clear",
    description: "Delete a number of messages from the channel (excludes pinned messages)",
    options: [
        {
            name: "count",
            description: "The number of messages to delete",
            required: true,
            type: "NUMBER",
            minValue: 1,
            maxValue: 100
		}
	],

    /**
    * @param {Client} client 
    * @param {CommandInteraction} interaction 
    */

    run: async (client, interaction) => {
        // Defer the reply
        await interaction.deferReply({ ephemeral: true });

        // Make sure user has the correct permissions
        if (!interaction.member.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES])) throw new PermissionError("You do not have the correct permissions to delete messages in this server.");
        
        // Get the count and delete the appropriate number of messages (excluding pinned messages)
        const count = interaction.options.getNumber("count");
        const fetched = await interaction.channel.messages.fetch({ limit: count });
        const notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned);
        await interaction.channel.bulkDelete(notPinned, true);

        // Tell the user
        const embed = PlainEmbed(interaction, "Messages Deleted", `${notPinned.size} message(s) deleted.`);
        await interaction.followUp({ embeds: [ embed ] });
    }
}