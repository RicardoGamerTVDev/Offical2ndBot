"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord = require("discord.js");
const fs = require("fs");
const xp = require("../../xp.json");
class LevelCommand {
    constructor() {
        this.CMD_REGEXP = /^\?level/im;
    }
    getHelp() {
        return { caption: '?level', description: 'Lets you know your level and exp in the server' };
    }
    init(bot, dataPath) { }
    isValid(msg) {
        return this.CMD_REGEXP.test(msg);
    }
    async process(msg, answer, msgObj, client, config, commands) {
        if (!xp[msgObj.author.id]) {
            xp[msgObj.author.id] = {
                xp: 0,
                level: 1
            };
        }
        let curXp = xp[msgObj.author.id].xp;
        let curLvl = xp[msgObj.author.id].level;
        let nxtLvlXp = (curLvl * 200) * 1.2;
        let difference = nxtLvlXp - curXp;
        let levelEmbed = new discord.RichEmbed()
            .setTitle(msgObj.author.username)
            .setColor("#ff00ff")
            .addField("Level", curLvl, true)
            .addField("XP", curXp, true)
            .setFooter(`${difference} XP until level up`, msgObj.author.displayAvatarURL);
        msgObj.channel.send(levelEmbed).then(newMsg => {
            msgObj.delete(0);
            newMsg.delete(5000);
        });
        fs.writeFile("../xp.json", JSON.stringify(xp), (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
}
exports.default = LevelCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbGV2ZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxzQ0FBcUM7QUFFckMseUJBQXdCO0FBRXhCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUVwQyxNQUFxQixZQUFZO0lBQWpDO1FBQ3FCLGVBQVUsR0FBRyxZQUFZLENBQUE7SUEyQzlDLENBQUM7SUF6Q1UsT0FBTztRQUNWLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxnREFBZ0QsRUFBRSxDQUFBO0lBQy9GLENBQUM7SUFFTSxJQUFJLENBQUMsR0FBUyxFQUFFLFFBQWdCLElBQVUsQ0FBQztJQUUzQyxPQUFPLENBQUMsR0FBVztRQUN0QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3BDLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQVcsRUFBRSxNQUFtQixFQUFFLE1BQXVCLEVBQUUsTUFBc0IsRUFBRSxNQUFrQixFQUFFLFFBQXVCO1FBQy9JLElBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBQztZQUNyQixFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRztnQkFDbkIsRUFBRSxFQUFFLENBQUM7Z0JBQ0wsS0FBSyxFQUFFLENBQUM7YUFDWCxDQUFDO1NBQ0w7UUFDRCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDcEMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3hDLElBQUksUUFBUSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNwQyxJQUFJLFVBQVUsR0FBRyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWxDLElBQUksVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTthQUNuQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7YUFDaEMsUUFBUSxDQUFDLFNBQVMsQ0FBQzthQUNuQixRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7YUFDL0IsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO2FBQzNCLFNBQVMsQ0FBQyxHQUFHLFVBQVUsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBRWpGLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMxQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQTBCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ25ELElBQUcsR0FBRyxFQUNOO2dCQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDcEI7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSjtBQTVDRCwrQkE0Q0MifQ==