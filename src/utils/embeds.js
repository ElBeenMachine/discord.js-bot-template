const { MessageEmbed } = require("discord.js")
const { version } = require("../../package.json");

function setFooter(client, embed) {
    embed.setFooter({ text: `${client.user.username} - v${version}`, iconURL: client.user.avatarURL({ dynamic: true }) });
    return embed
}

function PlainEmbed(interaction, title, body) {
    let embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(body)
        .setColor(interaction.client.embedColour)
        .setTimestamp()
    setFooter(interaction.client, embed)
    return embed
}

function ThumbEmbed(interaction, title, body, thumbnail) {
    let embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(body)
        .setThumbnail(thumbnail || interaction.client.user.avatarURL({ dynamic: true }))
        .setColor(interaction.client.embedColour)
        .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
    setFooter(interaction.client, embed)
    return embed
}

function ErrorEmbed(client, error) {
    let embed = new MessageEmbed()
        .setTitle("An error has occurred")
        .setDescription(error)
        .setColor("#F90000")
        .setTimestamp()
    setFooter(client, embed)
    return embed
}

module.exports.ThumbEmbed = ThumbEmbed;
module.exports.PlainEmbed = PlainEmbed;
module.exports.ErrorEmbed = ErrorEmbed;