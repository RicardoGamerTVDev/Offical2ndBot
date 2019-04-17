"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const superAgent = require("superagent");
class DoggoCommand {
    constructor() {
        this.CMD_REGEXP = /^\?doggo/im;
    }
    getHelp() {
        return { caption: '?doggo', description: 'Summons a good boi :3' };
    }
    init(bot, dataPath) { }
    isValid(msg) {
        return this.CMD_REGEXP.test(msg);
    }
    async process(msg, answer, msgObj, client, config, commands) {
        let { body } = await superAgent
            .get(`https://random.dog/woof.json`);
        answer.setColor("GREEN");
        answer.setTitle("Here's a good doggo for youuuu");
        answer.setDescription("You really deserved this :)");
        answer.setImage(body.url);
    }
}
exports.default = DoggoCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9nZ28uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZG9nZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSx5Q0FBd0M7QUFFeEMsTUFBcUIsWUFBWTtJQUFqQztRQUNxQixlQUFVLEdBQUcsWUFBWSxDQUFBO0lBb0I5QyxDQUFDO0lBbEJVLE9BQU87UUFDVixPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQTtJQUN0RSxDQUFDO0lBRU0sSUFBSSxDQUFDLEdBQVMsRUFBRSxRQUFnQixJQUFVLENBQUM7SUFFM0MsT0FBTyxDQUFDLEdBQVc7UUFDdEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFXLEVBQUUsTUFBbUIsRUFBRSxNQUF1QixFQUFFLE1BQXNCLEVBQUUsTUFBa0IsRUFBRSxRQUF1QjtRQUMvSSxJQUFHLEVBQUMsSUFBSSxFQUFDLEdBQUcsTUFBTSxVQUFVO2FBQ3ZCLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO1FBQ3hDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxjQUFjLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7QUFyQkQsK0JBcUJDIn0=