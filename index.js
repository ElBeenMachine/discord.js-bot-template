const bot = require("./src/structures/Bot");
const client = new bot();

client.connect();

module.exports = client;