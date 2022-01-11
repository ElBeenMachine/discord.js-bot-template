const { Client, Intents, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const logger = require("beenhamow-logger");

class bot extends Client {
    constructor() {
        super({
            shards: "auto",
            allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: false
            },
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MEMBERS
            ]
        });

        this.slashCommands = new Collection();
        this.config = require("../utils/config");
        this.embedColour = this.config.EMBED_COLOUR;
        this.emoji = require("../utils/emoji.js");

        const args = process.argv.slice(2);
        if(args[0] == "dev") {
            this.environment = "DEV";
        } else {
            this.environment = "PROD";
            this.DEV_GUILD = require("../utils/config");
        }
        logger.log(`Running in ${this.environment} environment`);

        // Set the bot's token
        if(!this.token) this.token = this.config.BOT_TOKEN;

        // Handle Errors
        this.on("disconnect", () => logger.warn("Bot has disconnected..."));
        this.on("reconnecting", () => logger.log("Bot is reconnecting..."));
        this.on("warn", error => logger.warn(error));
        this.on("error", error => logger.error(error));

        process.on("unhandledRejection", error => logger.error(error));
        process.on("uncaughtException", error => logger.error(error));

        // Client Events
        readdirSync("./src/events/Client/").forEach(file => {
            const event = require(`../events/Client/${file}`);
            const eventName = file.split(".")[0];
            logger.log(`Loaded Client Event: ${eventName}`);
            this.on(eventName, event.bind(null, this));
        });

        // Shash Commands
        const data = [];
        readdirSync("./src/slashCommands/").forEach((dir) => {
            const commandFiles = readdirSync(`./src/slashCommands/${dir}/`).filter(file => file.endsWith(".js"));
            for(const file of commandFiles) {
                const slashCommand = require(`../slashCommands/${dir}/${file}`);
                if(!slashCommand.name) return logger.error(`slashCommandNameError: ${slashCommand.split(".")[0]} application command name is required.`);
                if(!slashCommand.description) return logger.error(`slashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`);

                this.slashCommands.set(slashCommand.name, slashCommand);
                logger.log(`Slash Command (/) Loaded: ${slashCommand.name}`);
                data.push(slashCommand);
            }
        });

        this.on("ready", async () => {
            if(this.environment == "DEV") {
                await this.application.commands.set(data, this.config.DEV_GUILD).catch((e) => logger.error(e));
            } else {
                await this.application.commands.set(data).catch((e) => logger.error(e));
            }
        });
    }

    // Log in
    connect() {
        return super.login(this.BOT_TOKEN);
    }
}

module.exports = bot;