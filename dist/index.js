"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./bot");
const logger = console;
let cfg = require('./../bot.json');
try {
    const cfgProd = require('./../bot.prod.json');
    cfg = Object.assign({}, cfg, cfgProd);
}
catch (_a) {
    logger.info('no production config found...');
}
new bot_1.Bot().start(logger, cfg, `${__dirname}/commands`, `${__dirname}/../data`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwrQkFBMkI7QUFFM0IsTUFBTSxNQUFNLEdBQVksT0FBTyxDQUFBO0FBRS9CLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQWUsQ0FBQTtBQUNoRCxJQUFJO0lBQ0EsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFlLENBQUE7SUFDM0QsR0FBRyxxQkFBUSxHQUFHLEVBQUssT0FBTyxDQUFFLENBQUE7Q0FDL0I7QUFBQyxXQUFNO0lBQ0osTUFBTSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO0NBQy9DO0FBRUQsSUFBSSxTQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLFNBQVMsV0FBVyxFQUFFLEdBQUcsU0FBUyxVQUFVLENBQUMsQ0FBQSJ9