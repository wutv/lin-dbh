const D = require("discord.js"),
  { Collection, Structures } = D;
const { readdirSync } = require("fs");
global.__basedir = __dirname;
const CommandClass = require("./structures/internal/Command.js");
const config = require("./config.json");
class LinClient extends D.Client {
  constructor(token) {

    /**
     * Base client initialization.
     */

    super({
        intents: [
          "GUILD_PRESENCES",
          "GUILD_MEMBERS",
          "GUILDS",
          "GUILD_VOICE_STATES",
          "GUILD_MESSAGES",
          "GUILD_MESSAGE_REACTIONS",
        ],
    });

    /**
     * Object with client credentials.
     * @type {Object}
    */

    this.config = config;
   
    /**
     * Client token.
     * @type {String}
     */
   
    this.token = token.token;

    /**
     * Commands collection.
     * @type {Collection<Key, Command>}
     */

    this.commands = new Collection();

    /**
     * Aliases collection.
     * @type {Collection<Key, CommandName>}
     */

    this.aliases = new Collection();

    /**
     * Custom winston logger.
     * @type {Object}
     */
    
    this.logger = require("./structures/internal/WinstonLogger.js");

  }
start() {
    readdirSync("./commands").forEach((folder) => {
      readdirSync(`./commands/${folder}/`).forEach((file) => {
        const C = require(`./commands/${folder}/${file}`);
        if (!C instanceof CommandClass)
          throw new Error(
            `Command: ${C.name}: Command is not an instance of Command Class.`
          );
        this.commands.set(C.name, C);
        if (C.aliases?.length) this.aliases.forEach(ali => this.aliases.set(ali, C));
        this.logger.success(`Successfully loaded the command ${C.name}!`);
      });
    });
    const events = readdirSync("./events/");
    events.forEach(file => {
        const event = require(`./events/${file}`);
        event.once ? super.once(event.name, (...args) => event.exec(...args, this)) : super.on(event.name, (...args) => event.exec(...args, this));
    });
    const DiscordStructures = readdirSync("./structures/discord.js");
    DiscordStructures.forEach(structt => {
        const struct = require(`./structures/discord.js/${structt}`);
        Structures.extend(struct.name, struct.extend)
    })
    super.login(this.token);
  }
}

global.client = new LinClient({ token: config.token });
global.client.start();
process.on("unhandledRejection", (stuff) => client.logger.error(stuff));
process.on("uncaughtException", (stuff) => client.logger.error(stuff));
