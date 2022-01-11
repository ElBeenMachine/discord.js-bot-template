const logger = require("beenhamow-logger")

module.exports = (client, id, replayedEvents) => {
    logger.log(`Shard #${id} has resumed.`);
}