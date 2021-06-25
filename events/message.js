module.exports = {
    name: "message",
    async exec(message, client) {
        if (message.author.bot) return;
        const pref = client.config.prefixes.find(x => message.content.startsWith(x));
        if (!pref) return;
        message.__usedPrefix = pref;
        const args = message.content.slice(pref.length).trim().split(/ +/g);
        const cmd = client.commands.get(args.shift().toLowerCase()) || client.commands.get(client.aliases.get(args.shift().toLowerCase()));
        if (!cmd) return; 
        if (cmd.args && !args.length) return message.channel.sendCustom("error", "Invalid Arguments.", cmd.args, {
            footer: {
                iconURL: message.author.displayAvatarURL(),
                name: message.member.displayName
            }
        });
        if (cmd.ownerOnly && client.config.ownerIds.includes(message.author.id)) return message.channel.sendCustom("error", "OwnerOnly Command!", "The command you're using is ownerOnly!", {
        footer: {
                iconURL: message.author.displayAvatarURL(),
                name: message.member.displayName
            }
        })
        try {
            await cmd.run(message, args);
        } catch (e) {
            throw e;
        }
    }
}
