"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DoggoCommand {
    constructor() {
        this.CMD_REGEXP = /^\?flip/im;
    }
    getHelp() {
        return { caption: '?flip', description: 'Flips a coin. Landing on either heads or tails' };
    }
    init(bot, dataPath) { }
    isValid(msg) {
        return this.CMD_REGEXP.test(msg);
    }
    async process(msg, answer, msgObj, client, config, commands) {
        let options = ['your coin landed on tails', 'your coin landed on heads'];
        answer.setTitle(msgObj.author.username + ", " + options[Math.floor(Math.random() * options.length)]);
        answer.setColor("#ffe100");
    }
}
exports.default = DoggoCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9mbGlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsTUFBcUIsWUFBWTtJQUFqQztRQUNxQixlQUFVLEdBQUcsV0FBVyxDQUFBO0lBaUI3QyxDQUFDO0lBZlUsT0FBTztRQUNWLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxnREFBZ0QsRUFBRSxDQUFBO0lBQzlGLENBQUM7SUFFTSxJQUFJLENBQUMsR0FBUyxFQUFFLFFBQWdCLElBQVUsQ0FBQztJQUUzQyxPQUFPLENBQUMsR0FBVztRQUN0QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3BDLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQVcsRUFBRSxNQUFtQixFQUFFLE1BQXVCLEVBQUUsTUFBc0IsRUFBRSxNQUFrQixFQUFFLFFBQXVCO1FBQy9JLElBQUksT0FBTyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQUN6RSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDSjtBQWxCRCwrQkFrQkMifQ==