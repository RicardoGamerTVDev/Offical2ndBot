"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord = require("discord.js");
const path = require("path");
const message_1 = require("./message");
const websiteBotService_1 = require("./websiteBotService");
const fs = require("fs");
const xp = require("../xp.json");
class Bot {
    constructor() {
        this._commands = [];
    }
    get commands() { return this._commands; }
    get logger() { return this._logger; }
    get allUsers() { return this._client ? this._client.users.array().filter((i) => i.id !== '1') : []; }
    get onlineUsers() { return this.allUsers.filter((i) => i.presence.status !== 'offline'); }
    start(logger, config, commandsPath, dataPath) {
        this._logger = logger;
        this._config = config;
        this._welcomeChannel;
        this.loadCommands(commandsPath, dataPath);
        if (!this._config.token) {
            throw new Error('invalid discord token');
        }
        this._client = new discord.Client();
        this._client.on('ready', () => {
            this._botId = this._client.user.id;
            if (this._config.game) {
                this._client.user.setGame(this._config.game);
            }
            else {
                this._client.user.setActivity('?commands | With Ricky', { type: 'PLAYING' });
            }
            if (this._config.username && this._client.user.username !== this._config.username) {
                this._client.user.setUsername(this._config.username);
            }
            this._client.user.setStatus('dnd');
            this._logger.info('Started...');
            this._welcomeChannel = this._client.channels.get(this._config.welcomeChannel);
            this._websiteBotService = new websiteBotService_1.websiteBotService(this._client, this._config);
            this._websiteBotService.startupService();
        });
        this._client.on('guildMemberAdd', async (member) => {
            let welcomeEmbed = new discord.RichEmbed()
                .setTitle("Welcome " + member.user.username + "!")
                .setColor("GREEN")
                .addField("Information", "I've just sent you a PM with some details about the server, it would mean a lot if you were to give them a quick read.")
                .addField("Thanks For Joining The Other " + (member.guild.memberCount).toString() + " Of Us!", "Sincerely, your friend, JuliaBot.");
            if (member.user.avatarURL != null) {
                welcomeEmbed.setImage(member.user.avatarURL);
            }
            else {
                welcomeEmbed.setImage(this._client.user.displayAvatarURL);
            }
            this._welcomeChannel.send(welcomeEmbed);
            member.send("Hello " + member.displayName + ". Thanks for joining the server. If you wish to use our bot then simply use the command '?commands' in any channel and you'll recieve a pm with a list about all our commands. Anyway, here are the server rules:");
            let embed = new discord.RichEmbed()
                .addField("Rule 1", "Keep the chat topics relevant to the channel you're using")
                .addField("Rule 2", "No harassing others (we're all here to help and to learn)")
                .addField("Rule 3", "No spam advertising (if there's anything you're proud of and you want it to be seen then put it in the showcase channel, but only once)")
                .addField("Rule 4", "Don't go around sharing other people's work claiming it to be your own")
                .addField("Rule 5", "You must only use ?report command for rule breaking and negative behaviour. Abusing this command will result if you being the one who is banned")
                .setThumbnail(this._client.user.displayAvatarURL)
                .setColor("GREEN")
                .setFooter("If these rules are broken then don't be surprised by a ban");
            member.send(embed);
            member.send("If you are happy with these rules then feel free to use the server as much as you like. The more members the merrier :D");
            member.send("Use the command '?commands' to recieve a PM with all my commands and how to use them");
            member.send("(I am currently being tested on by my creator so if something goes wrong with me, don't panic, i'll be fixed. That's it from me. I'll see you around :)");
            member.addRole(member.guild.roles.find("name", "fan"));
        });
        this._client.on('guildMemberRemove', async (member) => {
            this._welcomeChannel.send(member + ", it's a shame you had to leave us. We'll miss you :(");
        });
        this._client.on('message', async (message) => {
            if (message.author.id !== this._botId) {
                const text = message.cleanContent;
                this._logger.debug(`[${message.author.tag}] ${text}`);
                if (!xp[message.author.id]) {
                    xp[message.author.id] = {
                        xp: 0,
                        level: 1
                    };
                }
                let xpAmt = Math.floor(Math.random() * 10) + 5;
                let curxp = xp[message.author.id].xp;
                let curlvl = xp[message.author.id].level;
                let nxtLvl = (xp[message.author.id].level * 200) * 1.2;
                xp[message.author.id].xp = curxp + xpAmt;
                if (nxtLvl <= xp[message.author.id].xp) {
                    xp[message.author.id].level = curlvl + 1;
                    let embed = new discord.RichEmbed()
                        .setTitle("Level Up!")
                        .setColor("ff00ff")
                        .addField("Congratulations", message.author)
                        .addField("New Level:", curlvl + 1);
                    message.channel.send(embed).then(msg => {
                        msg.delete(5000);
                    });
                }
                fs.writeFile("../xp.json", JSON.stringify(xp), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                for (const cmd of this._commands) {
                    try {
                        if (cmd.isValid(text)) {
                            const answer = new message_1.BotMessage(message.author);
                            if (!this._config.idiots || !this._config.idiots.includes(message.author.id)) {
                                await cmd.process(text, answer, message, this._client, this._config, this._commands, this._websiteBotService);
                            }
                            else {
                                if (this._config.idiotAnswer) {
                                    answer.setTextOnly(this._config.idiotAnswer);
                                }
                            }
                            if (answer.isValid()) {
                                message.channel.send(answer.text || { embed: answer.richText })
                                    .then(console.log)
                                    .catch(console.error);
                            }
                            break;
                        }
                    }
                    catch (ex) {
                        this._logger.error(ex);
                        return;
                    }
                }
            }
        });
        this._client.login(this._config.token);
    }
    loadCommands(commandsPath, dataPath) {
        if (!this._config.commands || !Array.isArray(this._config.commands) || this._config.commands.length === 0) {
            throw new Error('Invalid / empty commands list');
        }
        for (const cmdName of this._config.commands) {
            const cmdClass = require(`${commandsPath}/${cmdName}`).default;
            const command = new cmdClass();
            command.init(this, path.resolve(`${dataPath}/${cmdName}`));
            this._commands.push(command);
            this._logger.info(`command "${cmdName}" loaded...`);
        }
    }
}
exports.Bot = Bot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFxQztBQUVyQyw2QkFBNEI7QUFFNUIsdUNBQXNDO0FBQ3RDLDJEQUF1RDtBQUN2RCx5QkFBd0I7QUFFeEIsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRWpDLE1BQWEsR0FBRztJQUFoQjtRQVNxQixjQUFTLEdBQWtCLEVBQUUsQ0FBQztJQWlKbkQsQ0FBQztJQXpKRyxJQUFXLFFBQVEsS0FBb0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFBLENBQUMsQ0FBQztJQUU5RCxJQUFXLE1BQU0sS0FBSyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUEsQ0FBQyxDQUFDO0lBRTNDLElBQVcsUUFBUSxLQUFLLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUEsQ0FBQyxDQUFDO0lBRTNHLElBQVcsV0FBVyxLQUFLLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQVV6RixLQUFLLENBQUMsTUFBZSxFQUFFLE1BQWtCLEVBQUUsWUFBb0IsRUFBRSxRQUFnQjtRQUNwRixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQTtRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQTtRQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDO1FBRXJCLElBQUksQ0FBQyxZQUFZLENBQUMsWUFB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