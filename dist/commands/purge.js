"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PurgeCommand {
    constructor() {
        this.CMD_REGEXP = /^\?purge/im;
    }
    getHelp() {
        return { caption: '?purge', description: 'ADMIN ONLY - (?purge [@user] [number of message to delete]) Bulk delete a number of this user\'s messages from the channel' };
    }
    init(bot, dataPath) { }
    isValid(msg) {
        return this.CMD_REGEXP.test(msg);
    }
    async process(msg, answer, msgObj, client, config, commands) {
        msgObj.delete(0);
        if (!msgObj.member.hasPermission("MANAGE_MESSAGES")) {
            return;
        }
        let purgedUser = msgObj.guild.member(msgObj.mentions.users.first());
        if (!purgedUser) {
            return;
        }
        if (purgedUser.hasPermission("MANAGE_MESSAGES")) {
            return;
        }
        let words = msg.split(' ');
        let amount = parseInt(words.slice(2).join(' '));
        if (isNaN(amount)) {
            return;
        }
        msgObj.channel.bulkDelete(amount)
            .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
            .catch(console.error);
    }
}
exports.default = PurgeCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvcHVyZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxNQUFxQixZQUFZO0lBQWpDO1FBQ3FCLGVBQVUsR0FBRyxZQUFZLENBQUE7SUFxQzlDLENBQUM7SUFuQ1UsT0FBTztRQUNWLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSw0SEFBNEgsRUFBRSxDQUFBO0lBQzNLLENBQUM7SUFFTSxJQUFJLENBQUMsR0FBUyxFQUFFLFFBQWdCLElBQVUsQ0FBQztJQUUzQyxPQUFPLENBQUMsR0FBVztRQUN0QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3BDLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQVcsRUFBRSxNQUFtQixFQUFFLE1BQXVCLEVBQUUsTUFBc0IsRUFBRSxNQUFrQixFQUFFLFFBQXVCO1FBQy9JLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsSUFBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLEVBQ2xEO1lBQ0ksT0FBTztTQUNWO1FBQ0QsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNwRSxJQUFHLENBQUMsVUFBVSxFQUNkO1lBQ0ksT0FBTztTQUNWO1FBQ0QsSUFBRyxVQUFVLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLEVBQzlDO1lBQ0ksT0FBTztTQUNWO1FBQ0QsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoRCxJQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFDaEI7WUFDSSxPQUFPO1NBQ1Y7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7YUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsUUFBUSxDQUFDLElBQUksV0FBVyxDQUFDLENBQUM7YUFDdkUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM3QixDQUFDO0NBQ0o7QUF0Q0QsK0JBc0NDIn0=