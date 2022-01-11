const { CommandInteraction, Client } = require("discord.js");
const { ThumbEmbed } = require("../../utils/embeds");

module.exports = {
    name: "ping",
    description: "Returns websocket ping",

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
    */

    run: async(client, interaction) => {
        await interaction.deferReply();
        
        await interaction.editReply({ content: "Pinging..." }).then(async () => {
            const ping = Date.now() - interaction.createdAt;
            const apiPing = client.ws.ping;
            let embed = new ThumbEmbed(interaction, `${client.emoji.ping} Pong!`, "", client.user.displayAvatarURL({ dynamic: true }));
            embed.addFields([{ name: "Bot Latency", value: `\`\`\`ini\n[ ${ping}ms ]\n\`\`\``, inline: true }, { name: "API Latency", value: `\`\`\`ini\n[ ${apiPing}ms ]\n\`\`\``, inline: true }]);
        
            await interaction.editReply({ embeds: [embed] });
        });
    }
}