const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "TextChannel",
    extend(TextChannel) {
        class LinTextChannel extends TextChannel {
            async sendCustom(which, title, description, optionsRaw) {
                if (!["success", "error"].includes(which)) throw new Error("Invalid custom send type provided.");
                let options = optionsRaw ?? {};
                optionsRaw["author"] = {
                    name: title,
                    iconURL: which.toLowerCase() == "success" ? "https://uxwing.com/wp-content/themes/uxwing/download/01-user_interface/check-mark-circle.png" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd6K0bsxE2e3walXf3tIiCGnX_o2zwcjdUAUCm0E54Hkk3PGi2SkWWQhWK_mi9tM0c1-E&usqp=CAU"
                };
                optionsRaw["description"] = description;

                const embed = new MessageEmbed(options);
                const msg = await this.send(embed);
                return msg;
            }
        }
        return LinTextChannel;
    }
}