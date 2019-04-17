"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord = require("discord.js");
class CommandsCommand {
    constructor() {
        this.CMD_REGEXP = /^\?commands/im;
    }
    getHelp() {
        return { caption: '?commands', description: 'Sends you a list of all our commands, that\'ts how you got here in the first place' };
    }
    init(bot, dataPath) { }
    isValid(msg) {
        return this.CMD_REGEXP.test(msg);
    }
    async process(msg, answer, msgObj, client, config, commands) {
        let helpEmbed = new discord.RichEmbed()
            .setTitle("Here is a list of all our commands")
            .setColor("GREEN");
        let helpObj;
        for (const cmd of commands) {
            helpObj = cmd.getHelp();
            helpEmbed.addField(helpObj.caption, helpObj.description, false);
        }
        msgObj.author.send(helpEmbed);
        let confirmationEmbed = new discord.RichEmbed()
            .setTitle("Hello " + msgObj.author.username)
            .setColor("GREEN")
            .addField("I've just sent you a pm with all the server's commands", "I hope you enjoy your time here and make the most out of me, JuliaBot", false);
        msgObj.channel.send(confirmationEmbed).then(newMsg => {
            msgObj.delete(0);
            newMsg.delete(5000);
        });
    }
}
exports.default = CommandsCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvY29tbWFuZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxzQ0FBcUM7QUFFckMsTUFBcUIsZUFBZTtJQUFwQztRQUNxQixlQUFVLEdBQUcsZUFBZSxDQUFBO0lBZ0NqRCxDQUFDO0lBOUJVLE9BQU87UUFDVixPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsb0ZBQW9GLEVBQUUsQ0FBQTtJQUN0SSxDQUFDO0lBRU0sSUFBSSxDQUFDLEdBQVMsRUFBRSxRQUFnQixJQUFVLENBQUM7SUFFM0MsT0FBTyxDQUFDLEdBQVc7UUFDdEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFXLEVBQUUsTUFBbUIsRUFBRSxNQUF1QixFQUFFLE1BQXNCLEVBQUUsTUFBa0IsRUFBRSxRQUF1QjtRQUMvSSxJQUFJLFNBQVMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7YUFDbEMsUUFBUSxDQUFDLG9DQUFvQyxDQUFDO2FBQzlDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QixJQUFJLE9BQU8sQ0FBQztRQUNaLEtBQUssTUFBTSxHQUFHLElBQUksUUFBUSxFQUMxQjtZQUNJLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUMsS0FBSyxDQUFDLENBQUM7U0FDakU7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QixJQUFJLGlCQUFpQixHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTthQUMxQyxRQUFRLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO2FBQzNDLFFBQVEsQ0FBQyxPQUFPLENBQUM7YUFDakIsUUFBUSxDQUFDLHdEQUF3RCxFQUFDLHVFQUF1RSxFQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3JKLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2pELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBMEIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFqQ0Qsa0NBaUNDIn0=