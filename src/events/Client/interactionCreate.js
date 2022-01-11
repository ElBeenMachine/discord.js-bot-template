const { ErrorEmbed } = require("../../utils/embeds");

module.exports = async(client, interaction) => {
    if(interaction.isCommand()) {
        const slashCommand = client.slashCommands.get(interaction.commandName);
        if(!slashCommand) return;

        try {
            await slashCommand.run(client, interaction);
        } catch(error) {
            const embed = new ErrorEmbed(client, error.message);

            if(interaction.replied) {
                await interaction.editReply({ embeds: [embed] });
            } else {
                try {
                    await interaction.reply({ ephemeral: true, embeds: [embed] });
                } catch {
                    await interaction.followUp({ ephemeral: true, embeds: [embed] });
                }
            }
        }
    } else return;
}