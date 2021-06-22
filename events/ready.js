const DanBotHosting = require("danbot-hosting");

module.exports = {
    name: "ready",
    once: true,
    async exec (client) {
        client.logger.success("LinBot successfully logged in!")

        const API = new DanBotHosting.Client(client.config.apiKey, client);
 
        let initalPost = await API.autopost();

        if (initialPost) throw initialPost;
    }
}
