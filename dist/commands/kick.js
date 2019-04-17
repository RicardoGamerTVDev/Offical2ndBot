"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord = require("discord.js");
class KickCommand {
    constructor() {
        this.CMD_REGEXP = /^\?kick/im;
    }
    getHelp() {
        return { caption: '?kick', description: 'ADMIN ONLY - (?kick [@user] [reason]) to kick the user from the server with a given reason' };
    }
    init(bot, dataPath) { }
    isValid(msg) {
        return this.CMD_REGEXP.test(msg);
    }
    async process(msg, answer, msgObj, client, config, commands) {
        if (!msgObj.member.hasPermission("MANAGE_MESSAGES")) {
            msgObj.channel.send("You don't have the privileges to kick other users!");
            return;
        }
        let kickedUser = msgObj.guild.member(msgObj.mentions.users.first());
        if (!kickedUser) {
            msgObj.channel.send("Sorry, I couldn't find that user");
            return;
        }
        let words = msg.split(' ');
        let reason = words.slice(2).join(' ');
        let kickEmbed = new discord.RichEmbed()
            .setDescription("Kick Details")
            .setColor("0x191a1c")
            .addField("Kicked User:", kickedUser + " with ID: " + kickedUser.id)
            .addField("Kicked By:", msgObj.author + " with ID: " + msgObj.author.id)
            .addField("Kicked in the:", msgObj.channel + " channel")
            .addField("Kicked at:", msgObj.createdAt)
            .addField("Reason for kick:", reason);
        msgObj.delete(0)
            .then(console.log)
            .catch(console.error);
        client.channels.get(config.kicksAndBansChannel).send(kickEmbed)
            .then(console.log)
            .catch(console.error);
        msgObj.guild.member(kickedUser).kick(reason)
            .then(console.log)
            .catch(console.error);
    }
}
exports.default = KickCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2ljay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9raWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsc0NBQXFDO0FBRXJDLE1BQXFCLFdBQVc7SUFBaEM7UUFDcUIsZUFBVSxHQUFHLFdBQVcsQ0FBQTtJQTRDN0MsQ0FBQztJQTFDVSxPQUFPO1FBQ1YsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLDRGQUE0RixFQUFFLENBQUE7SUFDMUksQ0FBQztJQUVNLElBQUksQ0FBQyxHQUFTLEVBQUUsUUFBZ0IsSUFBVSxDQUFDO0lBRTNDLE9BQU8sQ0FBQyxHQUFXO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBVyxFQUFFLE1BQW1CLEVBQUUsTUFBdUIsRUFBRSxNQUFzQixFQUFFLE1BQWtCLEVBQUUsUUFBdUI7UUFDL0ksSUFBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLEVBQ2xEO1lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0RBQW9ELENBQUMsQ0FBQztZQUMxRSxPQUFPO1NBQ1Y7UUFDRCxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLElBQUcsQ0FBQyxVQUFVLEVBQ2Q7WUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQ3hELE9BQU87U0FDVjtRQUNELElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2FBQ2xDLGNBQWMsQ0FBQyxjQUFjLENBQUM7YUFDOUIsUUFBUSxDQUFDLFVBQVUsQ0FBQzthQUNwQixRQUFRLENBQUMsY0FBYyxFQUFFLFVBQVUsR0FBRyxZQUFZLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQzthQUNuRSxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2FBQ3ZFLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQzthQUN2RCxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUM7YUFDeEMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7YUFDakIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQXlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUNuRixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzthQUNqQixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7YUFDakIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7QUE3Q0QsOEJBNkNDIn0=