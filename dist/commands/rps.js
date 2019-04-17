"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord = require("discord.js");
const fs = require("fs");
const gameScores = require("../../gameScores.json");
class RPSCommand {
    constructor() {
        this.CMD_REGEXP = /^\?rps/im;
    }
    getHelp() {
        return { caption: '?rps', description: '(?rps [choice]) Play rock, paper, scissors against the me. Replace choice with either rock, paper or scissors. Eg. ?rps rock' };
    }
    init(bot, dataPath) { }
    isValid(msg) {
        return this.CMD_REGEXP.test(msg);
    }
    async process(msg, answer, msgObj, client, config, commands) {
        let words = msg.split(' ');
        let choice = words.slice(1).join(' ');
        let possibleChoices = ['rock', 'paper', 'scissors'];
        let botChoice = possibleChoices[Math.floor(Math.random() * 3)];
        let rpsEmbed = new discord.RichEmbed()
            .setTitle("Rock, Paper, Scissors")
            .setColor("#ff0000");
        if (choice == botChoice) {
            rpsEmbed.addField("We tied!", "We both picked " + choice + "! What a coincidence", false);
            gameScores.rpsTies += 1;
        }
        else if (choice == "rock") {
            if (botChoice == "scissors") {
                rpsEmbed.addField("Congratulations", "You beat me with your " + choice + " against my " + botChoice + "!", false);
                gameScores.rpsLosses += 1;
            }
            else {
                rpsEmbed.addField("What a shame...", "I beat you with my " + botChoice + " against your puny " + choice + "!", false);
                gameScores.rpsWins += 1;
            }
        }
        else if (choice == "paper") {
            if (botChoice == "rock") {
                rpsEmbed.addField("Congratulations", "You beat me with your " + choice + " against my " + botChoice + "!", false);
                gameScores.rpsLosses += 1;
            }
            else {
                rpsEmbed.addField("What a shame...", "I beat you with my " + botChoice + " against your puny " + choice + "!", false);
                gameScores.rpsWins += 1;
            }
        }
        else if (choice == "scissors") {
            if (botChoice == "paper") {
                rpsEmbed.addField("Congratulations", "You beat me with your " + choice + " against my " + botChoice + "!", false);
                gameScores.rpsLosses += 1;
            }
            else {
                rpsEmbed.addField("What a shame...", "I beat you with my " + botChoice + " against your puny " + choice + "!", false);
                gameScores.rpsWins += 1;
            }
        }
        else {
            rpsEmbed.addField("Failed to play Rock, Paper, Scissors", "Make sure that you entered the command properly", false);
            rpsEmbed.addField("Here is an example: ", "?rps paper", false);
        }
        fs.writeFile("../gameScores.json", JSON.stringify(gameScores), (err) => {
            if (err) {
                console.log(err);
            }
        });
        rpsEmbed.addField("My stats", "Wins: " + gameScores.rpsWins + ". Losses: " + gameScores.rpsLosses + ". Ties: " + gameScores.rpsTies + ".", false);
        msgObj.channel.send(rpsEmbed).then(newMsg => {
            msgObj.delete(0);
            newMsg.delete(5000);
        });
    }
}
exports.default = RPSCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3Jwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLHNDQUFxQztBQUNyQyx5QkFBd0I7QUFFeEIsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFFcEQsTUFBcUIsVUFBVTtJQUEvQjtRQUNxQixlQUFVLEdBQUcsVUFBVSxDQUFBO0lBa0Y1QyxDQUFDO0lBaEZVLE9BQU87UUFDVixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsOEhBQThILEVBQUUsQ0FBQTtJQUMzSyxDQUFDO0lBRU0sSUFBSSxDQUFDLEdBQVMsRUFBRSxRQUFnQixJQUFVLENBQUM7SUFFM0MsT0FBTyxDQUFDLEdBQVc7UUFDdEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFXLEVBQUUsTUFBbUIsRUFBRSxNQUF1QixFQUFFLE1BQXNCLEVBQUUsTUFBa0IsRUFBRSxRQUF1QjtRQUMvSSxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLElBQUksZUFBZSxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwRCxJQUFJLFNBQVMsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM5RCxJQUFJLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7YUFDakMsUUFBUSxDQUFDLHVC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