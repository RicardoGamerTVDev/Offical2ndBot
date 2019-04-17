"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord = require("discord.js");
class BanCommand {
    constructor() {
        this.CMD_REGEXP = /^\?ban/im;
    }
    getHelp() {
        return { caption: '?ban', description: 'ADMIN ONLY - (?ban [@user] [reason]) to ban the user from the server with a given reason' };
    }
    init(bot, dataPath) { }
    isValid(msg) {
        return this.CMD_REGEXP.test(msg);
    }
    async process(msg, answer, msgObj, client, config, commands) {
        if (!msgObj.member.hasPermission("MANAGE_MESSAGES")) {
            msgObj.channel.send("You don't have the privileges to ban other users!");
            return;
        }
        let bannedUser = msgObj.guild.member(msgObj.mentions.users.first());
        if (!bannedUser) {
            msgObj.channel.send("Sorry, I couldn't find that user");
            return;
        }
        let words = msg.split(' ');
        let reason = words.slice(2).join(' ');
        let banEmbed = new discord.RichEmbed()
            .setDescription("Ban Details")
            .setColor("0x191a1c")
            .addField("Banned User:", bannedUser + " with ID: " + bannedUser.id)
            .addField("Banned By:", msgObj.author + " with ID: " + msgObj.author.id)
            .addField("Banned in the:", msgObj.channel + " channel")
            .addField("Banned at:", msgObj.createdAt)
            .addField("Reason for ban:", reason);
        msgObj.delete(0)
            .then(console.log)
            .catch(console.error);
        client.channels.get(config.kicksAndBansChannel).send(banEmbed)
            .then(console.log)
            .catch(console.error);
        msgObj.guild.member(bannedUser).ban(reason)
            .then(console.log)
            .catch(console.error);
    }
}
exports.default = BanCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2Jhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHNDQUFxQztBQUVyQyxNQUFxQixVQUFVO0lBQS9CO1FBQ3FCLGVBQVUsR0FBRyxVQUFVLENBQUE7SUE0QzVDLENBQUM7SUExQ1UsT0FBTztRQUNWLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSwwRkFBMEYsRUFBRSxDQUFBO0lBQ3ZJLENBQUM7SUFFTSxJQUFJLENBQUMsR0FBUyxFQUFFLFFBQWdCLElBQVUsQ0FBQztJQUUzQyxPQUFPLENBQUMsR0FBVztRQUN0QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3BDLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQVcsRUFBRSxNQUFtQixFQUFFLE1BQXVCLEVBQUUsTUFBc0IsRUFBRSxNQUFrQixFQUFFLFFBQXVCO1FBQy9JLElBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUNsRDtZQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1EQUFtRCxDQUFDLENBQUM7WUFDekUsT0FBTztTQUNWO1FBQ0QsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNwRSxJQUFHLENBQUMsVUFBVSxFQUNkO1lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUN4RCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLElBQUksUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTthQUNqQyxjQUFjLENBQUMsYUFBYSxDQUFDO2FBQzdCLFFBQVEsQ0FBQyxVQUFVLENBQUM7YUFDcEIsUUFBUSxDQUFDLGNBQWMsRUFBRSxVQUFVLEdBQUcsWUFBWSxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUM7YUFDbkUsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQzthQUN2RSxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7YUFDdkQsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDO2FBQ3hDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO2FBQ2pCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUF5QixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDbEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7YUFDakIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO2FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO2FBQ2pCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKO0FBN0NELDZCQTZDQyJ9