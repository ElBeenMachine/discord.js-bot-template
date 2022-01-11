const logger = require("beenhamow-logger")

module.exports = (client, event, id) => {
    logger.warn(`Shard #${id} has Disconnected...`);
}