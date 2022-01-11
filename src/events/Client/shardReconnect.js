const logger = require("beenhamow-logger")

module.exports = (client, id) => {
    logger.log(`Shard #${id} is reconnecting...`);
}