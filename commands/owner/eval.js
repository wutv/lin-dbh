const sourcebin = require("sourcebin");
const { MessageEmbed } = require("discord.js");
const config = client.config;

module.exports = new (require("../../structures/internal/Command"))({
    name: "eval",
    ownerOnly: true,
    args: "hello wot u want me to eval dumbo",
    async run (message, args) {
        async function sendEmbed(content, input) {
            const toEval = input;
            let embed = new MessageEmbed()
              .setTitle("Eval Output.")
              .setAuthor(
                `Eval by ${message.author.username}.`,
                message.author.displayAvatarURL()
              )
              .addField(
                "Input",
                `\`\`\`js\n${
                  toEval.length > 1016
                    ? "Input is larger than 1016 characters."
                    : toEval
                }\`\`\``,
                true
              );
            if (content.length > 2032) {
              const src = await sourcebin
                .create(
                  [
                    {
                      content: content,
                      language: "javascript",
                    },
                  ],
                  {
                    name: `Code by ${message.author.tag}`,
                    description: `Output of the eval command used by ${message.author.tag}.`,
                  }
                )
                .catch((e) => {
                  return e;
                });
              const msg = await message.author.send(
                new MessageEmbed({
                  title: "Eval Output.",
                  description: `The output for the eval command was larger than 2032 characters. To check it, click [here](${src.url}) or use the link: ${src.url}.`,
                })
              );
              embed.setDescription(
                `**Output** \n Output is too large! Check your DMs, or click [here](${msg.url}).`
              );
              return embed;
            } else {
              embed.setDescription(`**Output**\n \`\`\`js\n${content}\n\`\`\``);
              return embed;
            }
          }
          const types = ["async", "sync"];
          const pref = message.__usedPrefix;
          if (!types.includes(args[0]))
            return message.channel.sendCustom(
              "error",
              "Invalid Arguments Provided!",
              `Please provide if you would like to eval in \`sync, or async\`. \n Examples: \`${pref}eval sync <code>\`, \n \`${pref}eval async <code>\`.`
            );
          let code = args.map((x) => x);
          code.shift();
          code = code.join(" ");
          try {
            if (!code)
              return message.channel.sendCustom(
                "error",
                "Invalid Arguments Provided!",
                "Please provide what you would like to eval!"
              );
            let evaled;
            args[0] === "sync"
              ? (evaled = eval(code))
              : (evaled = await eval(`(async () => {
              ${code}
            })()`));
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled, { depth: 4 });
            if (evaled.includes(config.token))
              return message.channel.sendCustom(
                "error",
                "Eval Error.",
                "This eval has the bot credentials! Please try without using the bot's credentials."
              );
      
            const embed = await sendEmbed(evaled, code);
            return message.channel.send(embed);
          } catch (err) {
            const embed = await sendEmbed(err, code);
            return message.channel.send(embed);
          }
    }
})
