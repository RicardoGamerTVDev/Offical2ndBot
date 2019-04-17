"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord = require("discord.js");
const fs = require("fs");
const suggest_1 = require("../models/suggest");
const discordUser_1 = require("../models/discordUser");
const apiRequestHandler_1 = require("../apiRequestHandler");
const dialogueHandler_1 = require("../dialogueHandler");
class SuggestCommand {
    constructor() {
        this.CMD_REGEXP = /^\?suggest/im;
        this.cbFunc = (response, data, endEarly) => {
            if (data == null) {
                data = new Array(response);
            }
            else {
                data.push(response);
            }
            console.log(data.join(", "));
            return [data, endEarly];
        };
        this.httpFunc = (response, data, ticketuser, config) => {
            let suggestObject = new suggest_1.suggest();
            suggestObject.Description = data[1];
            suggestObject.DiscordUser = new discordUser_1.discordUser();
            suggestObject.DiscordUser.Username = ticketuser.displayName;
            suggestObject.DiscordUser.DiscordId = ticketuser.id;
            switch (data[0].toLowerCase()) {
                case "bot":
                    suggestObject.Type = suggest_1.SuggestionTypes.Bot;
                    break;
                case "website":
                    suggestObject.Type = suggest_1.SuggestionTypes.Website;
                    break;
                case "general":
                    suggestObject.Type = suggest_1.SuggestionTypes.General;
                    break;
                case "youtube":
                    suggestObject.Type = suggest_1.SuggestionTypes.Youtube;
                    break;
                default:
                    suggestObject.Type = suggest_1.SuggestionTypes.Undecided;
            }
            new apiRequestHandler_1.apiRequestHandler().RequestAPI('POST', suggestObject, 'https://dapperdinoapi.azurewebsites.net/api/suggestion', config);
            return data;
        };
    }
    getHelp() {
        return { caption: '?suggest', description: 'Leave a suggestion for our server\'s bot, our website or leave a YouTube video suggestion. Just follow the prompts' };
    }
    init(bot, dataPath) { }
    isValid(msg) {
        return this.CMD_REGEXP.test(msg);
    }
    async process(msg, answer, msgObj, client, config, commands) {
        let collectedInfo;
        let test = new dialogueHandler_1.dialogueStep("Enter the category that best suits your suggestion. Choose from 'Bot', 'Website', 'General' or 'Youtube'.", "Type Successful", "Type Unsuccessful", this.cbFunc, collectedInfo);
        let test2 = new dialogueHandler_1.dialogueStep("Enter your suggestion:", "Suggestion Successful", "Suggestion Unsuccessful", this.cbFunc, this.httpFunc, collectedInfo);
        let handler = new dialogueHandler_1.dialogueHandler([test, test2], collectedInfo);
        collectedInfo = await handler.GetInput(msgObj.channel, msgObj.member, config);
        fs.appendFile('../suggestions.txt', "ID: " + msgObj.author + ", Username: " + msgObj.author.username + ", Suggestion: " + collectedInfo[1] + "\n", function (err) {
            if (err) {
                throw err;
            }
            console.log('Updated!');
        });
        msgObj.delete(0);
        let suggestionEmbed = new discord.RichEmbed()
            .setTitle("Thank You For Leaving A Suggestion")
            .setColor("GREEN")
            .addField(msgObj.author.username, "Suggested Julia. to: " + collectedInfo[1], false)
            .addField("Your request has been added to Ricky's video ideas list", "Thanks for your contribution", false)
            .setFooter("Sit tight and I might get around to your idea... eventually :D");
        msgObj.channel.send(suggestionEmbed);
    }
}
exports.default = SuggestCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnZ2VzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9zdWdnZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsc0NBQXFDO0FBQ3JDLHlCQUF3QjtBQUN4QiwrQ0FBNkQ7QUFDN0QsdURBQW9EO0FBQ3BELDREQUF5RDtBQUN6RCx3REFBbUU7QUFHbkUsTUFBcUIsY0FBYztJQUFuQztRQUNxQixlQUFVLEdBQUcsY0FBYyxDQUFBO1FBWTVDLFdBQU0sR0FBRyxDQUFDLFFBQWEsRUFBRSxJQUFTLEVBQUUsUUFBYSxFQUFFLEVBQUU7WUFDakQsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUNkLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBUyxRQUFRLENBQUMsQ0FBQzthQUN0QztpQkFDSTtnQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3ZCO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDNUIsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUM7UUFFRixhQUFRLEdBQUcsQ0FBQyxRQUFhLEVBQUUsSUFBUyxFQUFFLFVBQWUsRUFBRSxNQUFXLEVBQUUsRUFBRTtZQUNsRSxJQUFJLGFBQWEsR0FBVyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUMxQyxhQUFhLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxhQUFhLENBQUMsV0FBVyxHQUFHLElBQUkseUJBQVcsRUFBRSxDQUFDO1lBQzlDLGFBQWEsQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUM7WUFDNUQsYUFBYSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUNwRCxRQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBQztnQkFDekIsS0FBSyxLQUFLO29CQUNOLGFBQWEsQ0FBQyxJQUFJLEdBQUcseUJBQWUsQ0FBQyxHQUFHLENBQUM7b0JBQ3pDLE1BQU07Z0JBQ1YsS0FBSyxTQUFTO29CQUNWLGFBQWEsQ0FBQyxJQUFJLEdBQUcseUJBQWUsQ0FBQyxPQUFPLENBQUM7b0JBQzdDLE1BQU07Z0JBQ1YsS0FBSyxTQUFTO29CQUNWLGFBQWEsQ0FBQyxJQUFJLEdBQUcseUJBQWUsQ0FBQyxPQUFPLENBQUM7b0JBQzdDLE1BQU07Z0JBQ1YsS0FBSyxTQUFTO29CQUNWLGFBQWEsQ0FBQyxJQUFJLEdBQUcseUJBQWUsQ0FBQyxPQUFPLENBQUM7b0JBQzdDLE1BQU07Z0JBQ1Y7b0JBQ0ksYUFBYSxDQUFDLElBQUksR0FBRyx5QkFBZSxDQUFDLFNBQVMsQ0FBQzthQUN0RDtZQUVELElBQUkscUNBQWlCLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSx3REFBd0QsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUU1SCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUM7SUFnQ04sQ0FBQztJQS9FVSxPQUFPO1FBQ1YsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLG9IQUFvSCxFQUFFLENBQUE7SUFDckssQ0FBQztJQUVNLElBQUksQ0FBQyxHQUFTLEVBQUUsUUFBZ0IsSUFBVSxDQUFDO0lBRTNDLE9BQU8sQ0FBQyxHQUFXO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQXlDTSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQVcsRUFBRSxNQUFtQixFQUFFLE1BQXVCLEVBQUUsTUFBc0IsRUFBRSxNQUFrQixFQUFFLFFBQXVCO1FBRS9JLElBQUksYUFBYSxDQUFDO1FBR2xCLElBQUksSUFBSSxHQUFpQixJQUFJLDhCQUFZLENBQUMsMkdBQTJHLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUMzTixJQUFJLEtBQUssR0FBaUIsSUFBSSw4QkFBWSxDQUFDLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLHlCQUF5QixFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUVwSyxJQUFJLE9BQU8sR0FBRyxJQUFJLGlDQUFlLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFaEUsYUFBYSxHQUFHLE1BQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBOEIsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQW9CLENBQUMsQ0FBQztRQUVuSCxFQUFFLENBQUMsVUFBVSxDQUFDLG9CQUFvQixFQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLFVBQVMsR0FBRztZQUMzSixJQUFHLEdBQUcsRUFDTjtnQkFDSSxNQUFNLEdBQUcsQ0FBQzthQUNiO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakIsSUFBSSxlQUFlLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2FBQ3hDLFFBQVEsQ0FBQyxvQ0FBb0MsQ0FBQzthQUM5QyxRQUFRLENBQUMsT0FBTyxDQUFDO2FBQ2pCLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSx1QkFBdUIsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDO2FBQ25GLFFBQVEsQ0FBQyx5REFBeUQsRUFBRSw4QkFBOEIsRUFBRSxLQUFLLENBQUM7YUFDMUcsU0FBUyxDQUFDLGdFQUFnRSxDQUFDLENBQUE7UUFFaEYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDekMsQ0FBQztDQUNKO0FBbEZELGlDQWtGQyJ9