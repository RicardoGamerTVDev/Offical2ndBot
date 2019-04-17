"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerInfoCommand {
    constructor() {
        this.CMD_REGEXP = /^\?serverinfo/im;
    }
    getHelp() {
        return { caption: '?serverinfo', description: 'Here is some information about our server' };
    }
    init(bot, dataPath) { }
    isValid(msg) {
        return this.CMD_REGEXP.test(msg);
    }
    async process(msg, answer, msgObj, client, config, commands, websiteBotService) {
        answer.setDescription("Server Information");
        answer.setColor("GREEN");
        answer.setThumbnail(msgObj.guild.iconURL);
        answer.addField("The best server ever:", msgObj.guild.name, false);
        answer.addField("Was created on:", msgObj.guild.createdAt.toString(), false);
        answer.addField("You joined us on:", msgObj.member.joinedAt.toString(), false);
        answer.addField("Our member count is currently at:", websiteBotService.GetServerPopulation().toString(), false);
    }
}
exports.default = ServerInfoCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9zZXJ2ZXJpbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EsTUFBcUIsaUJBQWlCO0lBQXRDO1FBQ3FCLGVBQVUsR0FBRyxpQkFBaUIsQ0FBQTtJQXFCbkQsQ0FBQztJQW5CVSxPQUFPO1FBQ1YsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLDJDQUEyQyxFQUFFLENBQUE7SUFDL0YsQ0FBQztJQUVNLElBQUksQ0FBQyxHQUFTLEVBQUUsUUFBZ0IsSUFBVSxDQUFDO0lBRTNDLE9BQU8sQ0FBQyxHQUFXO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBVyxFQUFFLE1BQW1CLEVBQUUsTUFBdUIsRUFBRSxNQUFzQixFQUFFLE1BQWtCLEVBQUUsUUFBdUIsRUFBRSxpQkFBb0M7UUFDckwsTUFBTSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3RSxNQUFNLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9FLE1BQU0sQ0FBQyxRQUFRLENBQUMsbUNBQW1DLEVBQUUsaUJBQWlCLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwSCxDQUFDO0NBQ0o7QUF0QkQsb0NBc0JDIn0=