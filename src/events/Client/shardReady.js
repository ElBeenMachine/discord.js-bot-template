const logger = require("beenhamow-logger")

module.exports = (clinet, id) => {
    logger.log(`Shard #${id} is Ready!`);
}