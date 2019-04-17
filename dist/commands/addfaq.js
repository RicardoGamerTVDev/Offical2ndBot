"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord = require("discord.js");
const faq_1 = require("../models/faq");
const resourceLink_1 = require("../models/resourceLink");
const apiRequestHandler_1 = require("../apiRequestHandler");
const dialogueHandler_1 = require("../dialogueHandler");
class AddFaqCommand {
    constructor() {
        this.CMD_REGEXP = /^\?addfaq/im;
        this.cbFunc = (response, data, endEarly) => {
            if (data == null) {
                data = new Array(response);
            }
            else {
                data.push(response);
            }
            if (data[2]) {
                if (data[2] != 'yes' || data[2] == 'Yes') {
                    endEarly = true;
                }
            }
            console.log("cbfunc " + endEarly);
            console.log(data.join(", "));
            return [data, endEarly];
        };
        this.httpFunc = (response, data, ticketuser, config) => {
            let faqObject = new faq_1.faq();
            faqObject.Question = data[0];
            faqObject.Answer = data[1];
            if (data[2].toLowerCase() == 'yes' && data[3] != null && data[4] != null) {
                faqObject.ResourceLink = new resourceLink_1.resourceLink();
                faqObject.ResourceLink.Link = data[3];
                faqObject.ResourceLink.DisplayName = data[4];
                new apiRequestHandler_1.apiRequestHandler().RequestAPI("POST", faqObject, 'https://dapperdinoapi.azurewebsites.net/api/faq', config);
            }
            else if (data[2].toLowerCase() != 'yes') {
                new apiRequestHandler_1.apiRequestHandler().RequestAPI("POST", faqObject, 'https://dapperdinoapi.azurewebsites.net/api/faq', config);
            }
            return data;
        };
    }
    getHelp() {
        return { caption: '?addfaq', description: 'ADMIN ONLY - Creates a new entry to the FAQ channel, follow the prompts' };
    }
    init(bot, dataPath) { }
    isValid(msg) {
        return this.CMD_REGEXP.test(msg);
    }
    async process(msg, answer, msgObj, client, config, commands) {
        if (!msgObj.member.hasPermission("MANAGE_MESSAGES")) {
            msgObj.channel.send("You don't have the privileges to add to the FAQ channel!");
            return;
        }
        let collectedInfo;
        let test = new dialogueHandler_1.dialogueStep("Enter Question:", "Question Successful", "Question Unsuccessful", this.cbFunc, collectedInfo);
        let test2 = new dialogueHandler_1.dialogueStep("Enter Answer:", "Answer Successful", "Answer Unsuccessful", this.cbFunc, collectedInfo);
        let test3 = new dialogueHandler_1.dialogueStep("Would you like to add a resourceful URL related to the FAQ? (Enter 'Yes' if so, otherwise enter 'No')", "URL Choice Successful", "URL Choice Unsuccessful", this.cbFunc, this.httpFunc, collectedInfo);
        let test4 = new dialogueHandler_1.dialogueStep("Enter URL:", "URL Successful", "URL Unsuccessful", this.cbFunc, collectedInfo);
        let test5 = new dialogueHandler_1.dialogueStep("Enter URL Mask:", "URL Mask Successful", "URL Mask Unsuccessful", this.cbFunc, this.httpFunc, collectedInfo);
        let handler = new dialogueHandler_1.dialogueHandler([test, test2, test3, test4, test5], collectedInfo);
        collectedInfo = await handler.GetInput(msgObj.channel, msgObj.member, config);
        let faqEmbed = new discord.RichEmbed()
            .setTitle("-Q: " + collectedInfo[0])
            .setDescription("-A: " + collectedInfo[1])
            .setColor("#2dff2d");
        if (collectedInfo[2].toLowerCase() == 'yes') {
            faqEmbed.addField("Useful Resource: ", "[" + collectedInfo[4] + "](" + collectedInfo[3] + ")");
        }
        msgObj.channel.send(faqEmbed).then(newMsg => {
            msgObj.delete(0);
        });
    }
}
exports.default = AddFaqCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkZmFxLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2FkZGZhcS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHNDQUFzQztBQUN0Qyx1Q0FBb0M7QUFDcEMseURBQXNEO0FBQ3RELDREQUF5RDtBQUN6RCx3REFBbUU7QUFFbkUsTUFBcUIsYUFBYTtJQUFsQztRQUNxQixlQUFVLEdBQUcsYUFBYSxDQUFBO1FBWTNDLFdBQU0sR0FBRyxDQUFDLFFBQWEsRUFBRSxJQUFTLEVBQUUsUUFBYSxFQUFFLEVBQUU7WUFDakQsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUNkLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBUyxRQUFRLENBQUMsQ0FBQzthQUN0QztpQkFDSTtnQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3ZCO1lBQ0QsSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBQ1AsSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUM7b0JBQ3BDLFFBQVEsR0FBRyxJQUFJLENBQUM7aUJBQ25CO2FBQ0o7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQztRQUVGLGFBQVEsR0FBRyxDQUFDLFFBQWEsRUFBRSxJQUFTLEVBQUUsVUFBZSxFQUFFLE1BQVcsRUFBRSxFQUFFO1lBQ2xFLElBQUksU0FBUyxHQUFPLElBQUksU0FBRyxFQUFFLENBQUM7WUFDOUIsU0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFD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