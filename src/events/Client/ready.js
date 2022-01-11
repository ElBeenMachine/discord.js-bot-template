const logger = require("beenhamow-logger")

module.exports = async(client) => {
    logger.log(`${client.user.tag} is now online!`);
    logger.log(`Ready on ${client.guilds.cache.size} servers`);
    // Set Status
    client.user.setActivity("/ping", { type: "PLAYING" });
}