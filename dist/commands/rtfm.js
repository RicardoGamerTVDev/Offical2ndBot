"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord = require("discord.js");
class RTFMCommand {
    constructor() {
        this.CMD_REGEXP = /^\?rtfm/im;
    }
    getHelp() {
        return { caption: '?rtfm', description: 'ADMIN ONLY - (?rtfm [@user]) - Give a noob his own discord bot bible' };
    }
    init(bot, dataPath) { }
    isValid(msg) {
        return this.CMD_REGEXP.test(msg);
    }
    async process(msg, answer, msgObj, client, config, commands) {
        if (!msgObj.member.hasPermission("MANAGE_MESSAGES")) {
            msgObj.delete();
            return;
        }
        let rtfmUser = msgObj.guild.member(msgObj.mentions.users.first());
        if (!rtfmUser) {
            msgObj.delete();
            return;
        }
        let rtfmEmbed = new discord.RichEmbed()
            .setColor("GREEN")
            .setTitle("The Holy Book of Discord Bots")
            .setURL('https://discord.js.org/#/docs/main/stable/general/welcome/')
            .addField("There's no need to fear " + rtfmUser.displayName + ".", msgObj.author + " is here to save you. They have bestowed upon you the holy book of Discord Bots. If you read this book each day you will by no doubt develop something great.")
            .setFooter("Always refer to this book before becoming an annoyance to the members of the 'Happy To Help' role");
        msgObj.channel.send(rtfmEmbed).then(newmsg => {
            msgObj.delete(0);
        });
    }
}
exports.default = RTFMCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnRmbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9ydGZtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsc0NBQXFDO0FBRXJDLE1BQXFCLFdBQVc7SUFBaEM7UUFDcUIsZUFBVSxHQUFHLFdBQVcsQ0FBQTtJQW1DN0MsQ0FBQztJQWpDVSxPQUFPO1FBQ1YsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLHNFQUFzRSxFQUFFLENBQUE7SUFDcEgsQ0FBQztJQUVNLElBQUksQ0FBQyxHQUFTLEVBQUUsUUFBZ0IsSUFBVSxDQUFDO0lBRTNDLE9BQU8sQ0FBQyxHQUFXO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBVyxFQUFFLE1BQW1CLEVBQUUsTUFBdUIsRUFBRSxNQUFzQixFQUFFLE1BQWtCLEVBQUUsUUFBdUI7UUFDL0ksSUFBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLEVBQ2xEO1lBQ0ksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2hCLE9BQU87U0FDVjtRQUNELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDbEUsSUFBRyxDQUFDLFFBQVEsRUFDWjtZQUNJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNoQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLFNBQVMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7YUFDbEMsUUFBUSxDQUFDLE9BQU8sQ0FBQzthQUNqQixRQUFRLENBQUMsK0JBQStCLENBQUM7YUFDekMsTUFBTSxDQUFDLDREQUE0RCxDQUFDO2FBQ3BFLFFBQVEsQ0FBQywwQkFBMEIsR0FBRyxRQUFRLENBQUMsV0FBVyxHQUFHLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLCtKQUErSixDQUFDO2FBQ2xQLFNBQVMsQ0FBQyxtR0FBbUcsQ0FBQyxDQUFBO1FBRW5ILE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBcENELDhCQW9DQyJ9