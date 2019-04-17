"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord = require("discord.js");
class ReportCommand {
    constructor() {
        this.CMD_REGEXP = /^\?report/im;
    }
    getHelp() {
        return { caption: '?report', description: '(?report [@user] [reason]) to file a report claim that will be processed by the Admins' };
    }
    init(bot, dataPath) { }
    isValid(msg) {
        return this.CMD_REGEXP.test(msg);
    }
    async process(msg, answer, msgObj, client, config, commands) {
        let reportedUser = msgObj.guild.member(msgObj.mentions.users.first());
        if (!reportedUser) {
            msgObj.channel.send("Sorry, I couldn't find that user");
            return;
        }
        let words = msg.split(' ');
        let reason = words.slice(2).join(' ');
        let reportEmbed = new discord.RichEmbed()
            .setDescription("Report Details")
            .setColor("0x191a1c")
            .addField("Reported User:", reportedUser + " with ID: " + reportedUser.id)
            .addField("Reported By:", msgObj.author + " with ID: " + msgObj.author.id)
            .addField("Report in the:", msgObj.channel + " channel")
            .addField("Reported at:", msgObj.createdAt)
            .addField("Reason for report:", reason);
        msgObj.delete(0)
            .then(console.log)
            .catch(console.error);
        client.channels.get(config.reportChannel).send(reportEmbed)
            .then(console.log)
            .catch(console.error);
    }
}
exports.default = ReportCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3JlcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLHNDQUFxQztBQUdyQyxNQUFxQixhQUFhO0lBQWxDO1FBQ3FCLGVBQVUsR0FBRyxhQUFhLENBQUE7SUFvQy9DLENBQUM7SUFsQ1UsT0FBTztRQUNWLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSx3RkFBd0YsRUFBRSxDQUFBO0lBQ3hJLENBQUM7SUFFTSxJQUFJLENBQUMsR0FBUyxFQUFFLFFBQWdCLElBQVUsQ0FBQztJQUUzQyxPQUFPLENBQUMsR0FBVztRQUN0QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3BDLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQVcsRUFBRSxNQUFtQixFQUFFLE1BQXVCLEVBQUUsTUFBc0IsRUFBRSxNQUFrQixFQUFFLFFBQXVCO1FBQy9JLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDdEUsSUFBRyxDQUFDLFlBQVksRUFDaEI7WUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQ3hELE9BQU87U0FDVjtRQUNELElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2FBQ3BDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQzthQUNoQyxRQUFRLENBQUMsVUFBVSxDQUFDO2FBQ3BCLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLEdBQUcsWUFBWSxHQUFHLFlBQVksQ0FBQyxFQUFFLENBQUM7YUFDekUsUUFBUSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQzthQUN6RSxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7YUFDdkQsUUFBUSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDO2FBQzFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO2FBQ2pCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBeUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQy9FLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO2FBQ2pCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKO0FBckNELGdDQXFDQyJ9