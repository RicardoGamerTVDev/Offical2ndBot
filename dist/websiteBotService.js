"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compactDiscordUser_js_1 = require("./models/compactDiscordUser.js");
const apiRequestHandler_js_1 = require("./apiRequestHandler.js");
const email_js_1 = require("./models/email.js");
const aspnet = require("@aspnet/signalr");
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
class websiteBotService {
    constructor(serverBot, config) {
        this.startupService = () => {
            const connection = new aspnet.HubConnectionBuilder()
                .withUrl('https://dapperdino.azurewebsites.net/discordbothub')
                .configureLogging(aspnet.LogLevel.Information)
                .build();
            connection.start().catch(err => console.error(err.toString()));
            connection.on("ReceiveMessage", (user, message) => {
                let testUser = this._serverBot.users.get(this.GetDiscordUserByUsername(user).DiscordId);
                if (testUser) {
                    testUser.send(message)
                        .catch(console.error);
                }
            });
        };
        this._serverBot = serverBot;
        this._config = config;
    }
    GetServerPopulation() {
        return this._serverBot.users.array().length;
    }
    GetDiscordUserByUsername(username) {
        let allUsers = this._serverBot.users.array();
        let user;
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].username == username) {
                user = allUsers[i];
                console.log("Found User");
                break;
            }
        }
        let userObject = new compactDiscordUser_js_1.compactDiscordUser();
        if (user != null) {
            userObject.Username = user.username;
            userObject.DiscordId = user.id;
        }
        return userObject;
    }
    GetDiscordUserById(id) {
        let allUsers = this._serverBot.users.array();
        let user;
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].id == id) {
                user = allUsers[i];
                break;
            }
        }
        let userObject = new compactDiscordUser_js_1.compactDiscordUser();
        userObject.Username = user.username;
        userObject.DiscordId = user.id;
        return userObject;
    }
    GetDiscordUserByEmail(emailAddress) {
        let emailObject = new email_js_1.email();
        emailObject.Email = emailAddress;
        let responseData = new apiRequestHandler_js_1.apiRequestHandler().RequestAPI("POST", emailObject, "https://dapperdinoapi.azurewebsites.net/api/search/user", this._config);
        console.log(responseData);
    }
}
exports.websiteBotService = websiteBotService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic2l0ZUJvdFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvd2Vic2l0ZUJvdFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSwwRUFBb0U7QUFDcEUsaUVBQTJEO0FBQzNELGdEQUEwQztBQUMxQywwQ0FBMEM7QUFFcEMsTUFBTyxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxjQUFjLENBQUM7QUFFeEUsTUFBYSxpQkFBaUI7SUFLMUIsWUFBWSxTQUF3QixFQUFFLE1BQXFCO1FBSzNELG1CQUFjLEdBQUcsR0FBRSxFQUFFO1lBRWpCLE1BQU0sVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLG9CQUFvQixFQUFFO2lCQUMvQyxPQUFPLENBQUMsb0RBQW9ELENBQUM7aUJBQzdELGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO2lCQUM3QyxLQUFLLEVBQUUsQ0FBQztZQUNiLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFL0QsVUFBVSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRTtnQkFDOUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDeEYsSUFBRyxRQUFRLEVBQUM7b0JBQ1IsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ2pCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7aUJBQzVCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7UUFuQkcsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQW1CTSxtQkFBbUI7UUFDdEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDaEQsQ0FBQztJQUVNLHdCQUF3QixDQUFDLFFBQWU7UUFDM0MsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUM7UUFDVCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztZQUVwQyxJQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFDO2dCQUNoQyxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMxQixNQUFNO2FBQ1Q7U0FDSjtRQUNELElBQUksVUFBVSxHQUFHLElBQUksMENBQWtCLEVBQUUsQ0FBQTtRQUN6QyxJQUFHLElBQUksSUFBSSxJQUFJLEVBQUM7WUFDWixVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDcEMsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVNLGtCQUFrQixDQUFDLEVBQVM7UUFDL0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUM7UUFDVCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztZQUNwQyxJQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFDO2dCQUNwQixJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNO2FBQ1Q7U0FDSjtRQUNELElBQUksVUFBVSxHQUFHLElBQUksMENBQWtCLEVBQUUsQ0FBQTtRQUN6QyxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDcEMsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBRS9CLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxxQkFBcUIsQ0FBQyxZQUFtQjtRQUM1QyxJQUFJLFdBQVcsR0FBRyxJQUFJLGdCQUFLLEVBQUUsQ0FBQztRQUM5QixXQUFXLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLFlBQVksR0FBRyxJQUFJLHdDQUFpQixFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUseURBQXlELEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BKLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKO0FBeEVELDhDQXdFQyJ9