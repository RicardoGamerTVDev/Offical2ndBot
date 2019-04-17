"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RollCommand {
    constructor() {
        this.CMD_REGEXP = /^\?roll/im;
    }
    getHelp() {
        return { caption: '?roll', description: '(?roll [faces]) Rolls a die with your selected number of faces. If left blank, a six-sided die will used instead' };
    }
    init(bot, dataPath) { }
    isValid(msg) {
        return this.CMD_REGEXP.test(msg);
    }
    async process(msg, answer, msgObj, client, config, commands) {
        let words = msg.split(' ');
        let faces = parseInt(words.slice(1).join(' '));
        let result = 1;
        answer.setColor("#ffffff");
        if (isNaN(faces)) {
            result = Math.floor(Math.random() * 6) + 1;
            answer.setTitle(msgObj.author.username + ", your die landed on a " + result.toString());
        }
        else if (faces == 0) {
            answer.setTitle("Really... A zero sided die? Really???");
        }
        else {
            result = Math.floor(Math.random() * faces) + 1;
            answer.setTitle(msgObj.author.username + ", your die landed on a " + result.toString());
        }
    }
}
exports.default = RollCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9yb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EsTUFBcUIsV0FBVztJQUFoQztRQUNxQixlQUFVLEdBQUcsV0FBVyxDQUFBO0lBZ0M3QyxDQUFDO0lBOUJVLE9BQU87UUFDVixPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsa0hBQWtILEVBQUUsQ0FBQTtJQUNoSyxDQUFDO0lBRU0sSUFBSSxDQUFDLEdBQVMsRUFBRSxRQUFnQixJQUFVLENBQUM7SUFFM0MsT0FBTyxDQUFDLEdBQVc7UUFDdEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFXLEVBQUUsTUFBbUIsRUFBRSxNQUF1QixFQUFFLE1BQXNCLEVBQUUsTUFBa0IsRUFBRSxRQUF1QjtRQUMvSSxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0IsSUFBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQ2Y7WUFDSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcseUJBQXlCLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDM0Y7YUFDSSxJQUFHLEtBQUssSUFBSSxDQUFDLEVBQ2xCO1lBQ0ksTUFBTSxDQUFDLFFBQVEsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1NBQzVEO2FBRUQ7WUFDSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcseUJBQXlCLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDM0Y7SUFDTCxDQUFDO0NBQ0o7QUFqQ0QsOEJBaUNDIn0=