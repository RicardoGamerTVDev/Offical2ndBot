"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BotInfoCommand {
    constructor() {
        this.CMD_REGEXP = /^\?botinfo/im;
    }
    getHelp() {
        return { caption: '?botinfo', description: 'Here is some information about me, DapperBot' };
    }
    init(bot, dataPath) { }
    isValid(msg) {
        return this.CMD_REGEXP.test(msg);
    }
    async process(msg, answer, msgObj, client, config, commands) {
        answer.setDescription("Bot Information");
        answer.setColor("GREEN");
        answer.setThumbnail(client.user.displayAvatarURL);
        answer.addField("My name is JuliaBot.", "My goal in life is to make your life easier, and more fun :D", false);
        answer.addField("I was born on:", client.user.createdAt.toString(), false);
    }
}
exports.default = BotInfoCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90aW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9ib3RpbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsTUFBcUIsY0FBYztJQUFuQztRQUNxQixlQUFVLEdBQUcsY0FBYyxDQUFBO0lBbUJoRCxDQUFDO0lBakJVLE9BQU87UUFDVixPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsOENBQThDLEVBQUUsQ0FBQTtJQUMvRixDQUFDO0lBRU0sSUFBSSxDQUFDLEdBQVMsRUFBRSxRQUFnQixJQUFVLENBQUM7SUFFM0MsT0FBTyxDQUFDLEdBQVc7UUFDdEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFXLEVBQUUsTUFBbUIsRUFBRSxNQUF1QixFQUFFLE1BQXNCLEVBQUUsTUFBa0IsRUFBRSxRQUF1QjtRQUMvSSxNQUFNLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLDhEQUE4RCxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9HLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0UsQ0FBQztDQUNKO0FBcEJELGlDQW9CQyJ9