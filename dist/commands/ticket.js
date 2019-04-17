"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord = require("discord.js");
const ticket_1 = require("../models/ticket");
const applicant_1 = require("../models/applicant");
const apiRequestHandler_1 = require("../apiRequestHandler");
const dialogueHandler_1 = require("../dialogueHandler");
class TicketCommand {
    constructor() {
        this.CMD_REGEXP = /^\?ticket/im;
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
            let ticketObject = new ticket_1.ticket();
            ticketObject.Applicant = new applicant_1.applicant();
            ticketObject.Subject = data[0];
            ticketObject.Description = data[1];
            ticketObject.Applicant.Username = ticketuser.displayName;
            ticketObject.Applicant.DiscordId = ticketuser.id;
            new apiRequestHandler_1.apiRequestHandler().RequestAPI("POST", ticketObject, 'https://dapperdinoapi.azurewebsites.net/api/ticket', config);
            return data;
        };
    }
    getHelp() {
        return { caption: '?ticket', description: 'Creates a ticket for you to fill in via the prompts' };
    }
    init(bot, dataPath) { }
    isValid(msg) {
        return this.CMD_REGEXP.test(msg);
    }
    async process(msg, answer, msgObj, client, config, commands) {
        let collectedInfo;
        let test = new dialogueHandler_1.dialogueStep("Enter a title for your ticket, quickly summarise the problem that you are having:", "Title Successful", "Title Unsuccessful", this.cbFunc, collectedInfo);
        let test2 = new dialogueHandler_1.dialogueStep("Enter a description for your ticket. Please be as descriptive as possible so that whoever is assigned to help you knows in depth what you are struggling with:", "Description Successful", "Description Unsuccessful", this.cbFunc, this.httpFunc, collectedInfo);
        let handler = new dialogueHandler_1.dialogueHandler([test, test2], collectedInfo);
        collectedInfo = await handler.GetInput(msgObj.channel, msgObj.member, config);
        let ticketEmbed = new discord.RichEmbed()
            .setTitle("Ticket Created Successfully!")
            .setColor('GREEN')
            .addField("Your Title:", collectedInfo[0], false)
            .addField("Your Description:", collectedInfo[1], false)
            .setFooter("Thank you for subitting a ticket " + msgObj.author.username + ". We'll try to get around to it as soon as possible, please be patient.");
        msgObj.delete(0);
        msgObj.channel.send(ticketEmbed);
        let acceptTickets = msgObj.guild.channels.find(channel => channel.name == "ticket-to-accept");
        let ticketChanel = new discord.RichEmbed()
            .setTitle(`Ticket ${collectedInfo[0]} created.`)
            .setDescription(`Admins and h2h members, we suggest one of you help ${msgObj.author.username}!`)
            .addField('Title:', collectedInfo[0])
            .addField('Description:', collectedInfo[1])
            .setFooter('Let help this person! :D')
            .setColor('GREEN');
        acceptTickets.send(ticketChanel);
    }
}
exports.default = TicketCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3RpY2tldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHNDQUFxQztBQUVyQyw2Q0FBMEM7QUFDMUMsbURBQWdEO0FBQ2hELDREQUF5RDtBQUN6RCx3REFBbUU7QUFFbkUsTUFBcUIsYUFBYTtJQUFsQztRQUNxQixlQUFVLEdBQUcsYUFBYSxDQUFBO1FBWTNDLFdBQU0sR0FBRyxDQUFDLFFBQWEsRUFBRSxJQUFTLEVBQUUsUUFBYSxFQUFFLEVBQUU7WUFDakQsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUNkLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBUyxRQUFRLENBQUMsQ0FBQzthQUN0QztpQkFDSTtnQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3ZCO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDNUIsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUM7UUFFRixhQUFRLEdBQUcsQ0FBQyxRQUFhLEVBQUUsSUFBUyxFQUFFLFVBQWUsRUFBRSxNQUFXLEVBQUUsRUFBRTtZQUNsRSxJQUFJLFlBQVksR0FBVyxJQUFJLGVBQU0sRUFBRSxDQUFDO1lBQ3hDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUE7WUFDeEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsWUFBWSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQztZQUN6RCxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMs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