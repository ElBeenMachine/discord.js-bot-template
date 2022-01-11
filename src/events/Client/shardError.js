const logger = require("beenhamow-logger")

module.exports = (client, error, id) => {
    logger.error(`Shard #${id} has Errored!`);
}