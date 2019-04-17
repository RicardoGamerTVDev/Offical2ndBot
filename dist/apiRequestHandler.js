"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('request');
const fs = require("fs");
class apiRequestHandler {
    constructor() {
        this._headers = {
            'User-Agent': 'DapperBot/0.0.1',
            'Content-Type': 'application/json',
            'Authorization': ``
        };
    }
    async RequestAPI(httpType, data, requestUrl, config) {
        this._headers.Authorization = `Bearer ${config.apiBearerToken}`;
        var options = {
            url: requestUrl,
            method: httpType,
            headers: this._headers,
            json: data
        };
        request(options, (error, response, body) => {
            console.log(response.statusCode);
            if (!error && response.statusCode == 200) {
                return body;
            }
            else if (!error && response.statusCode == 401) {
                return this.GenerateNewToken(options, config);
            }
            else if (!error && response.statusCode == 403) {
                console.log("Unauthorized");
            }
        });
    }
    GenerateNewToken(first_options, config) {
        var options = {
            url: "https://dapperdinoapi.azurewebsites.net/api/account/login",
            method: "POST",
            headers: this._headers,
            json: {
                "Email": config.apiEmail,
                "Password": config.apiPassword
            }
        };
        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                console.log(body);
                config.apiBearerToken = body;
                fs.writeFile("../bot.prod.json", JSON.stringify(config), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
        request(first_options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                return body;
            }
            else if (!error && response.statusCode == 401) {
                console.log("Not authenticated ");
            }
        });
    }
}
exports.apiRequestHandler = apiRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpUmVxdWVzdEhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBpUmVxdWVzdEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFbkMseUJBQXdCO0FBRXhCLE1BQWEsaUJBQWlCO0lBQTlCO1FBRVksYUFBUSxHQUFHO1lBQ2YsWUFBWSxFQUFTLGlCQUFpQjtZQUN0QyxjQUFjLEVBQVMsa0JBQWtCO1lBQ3pDLGVBQWUsRUFBUyxFQUFFO1NBQzdCLENBQUE7SUE4REwsQ0FBQztJQTVEVSxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQWdGLEVBQUUsSUFBUyxFQUFFLFVBQWtCLEVBQUUsTUFBa0I7UUFFdkosSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsVUFBVSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFaEUsSUFBSSxPQUFPLEdBQUc7WUFDVixHQUFHLEVBQUUsVUFBVTtZQUNmLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN0QixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUE7UUFFRCxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBUyxFQUFFLFFBQVksRUFBRSxJQUFRLEVBQUUsRUFBRTtZQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxVQUFVLElBQUksR0FBRyxFQUFFO2dCQUN0QyxPQUFPLElBQUksQ0FBQzthQUNmO2lCQUNJLElBQUcsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxHQUFHLEVBQUM7Z0JBQ3pDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQzthQUNqRDtpQkFDSSxJQUFHLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxVQUFVLElBQUksR0FBRyxFQUFDO2dCQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQy9CO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sZ0JBQWdCLENBQUMsYUFBa0IsRUFBRSxNQUFrQjtRQUUxRCxJQUFJLE9BQU8sR0FBRztZQUNWLEdBQUcsRUFBRSwyREFBMkQ7WUFDaEUsTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdEIsSUFBSSxFQUFFO2dCQUNGLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUTtnQkFDeEIsVUFBVSxFQUFFLE1BQU0sQ0FBQyxXQUFXO2FBQ2pDO1NBQ0osQ0FBQTtRQUVELE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFTLEVBQUUsUUFBWSxFQUFFLElBQVEsRUFBRSxFQUFFO1lBQ25ELElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxHQUFHLEVBQUU7Z0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLE1BQU0sQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO2dCQUU3QixFQUFFLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDN0QsSUFBRyxHQUFHLEVBQ047d0JBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDcEI7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7YUFDTDtRQUNMLENBQUMsQ0FBQyxDQUFBO1FBRUYsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLEtBQVMsRUFBRSxRQUFZLEVBQUUsSUFBUSxFQUFFLEVBQUU7WUFDekQsSUFBSSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRTtnQkFDdEMsT0FBTyxJQUFJLENBQUM7YUFDZjtpQkFDSSxJQUFJLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxVQUFVLElBQUksR0FBRyxFQUFDO2dCQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7YUFDckM7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSjtBQXBFRCw4Q0FvRUMifQ==