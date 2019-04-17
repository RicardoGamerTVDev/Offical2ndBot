"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MirrorCommand {
    constructor() {
        this.CMD_REGEXP = /^\?mirror/im;
    }
    getHelp() {
        return { caption: '?mirror', description: 'Everyone loves recieving compliments, right?' };
    }
    init(bot, dataPath) { }
    isValid(msg) {
        return this.CMD_REGEXP.test(msg);
    }
    async process(msg, answer, msgObj, client, config, commands) {
        if (msgObj.author.avatarURL != null) {
            answer.setTextOnly(msgObj.member + " you're looking beautiful today :)");
            let m = await msgObj.channel.send(msgObj.author.avatarURL);
            m.react('😍')
                .then(console.log)
                .catch(console.error);
        }
        else {
            answer.setTextOnly(msgObj.member + " you broke the mirror! You really should get a profile pic for discord, make yourself look beautiful.");
        }
    }
}
exports.default = MirrorCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL21pcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLE1BQXFCLGFBQWE7SUFBbEM7UUFDcUIsZUFBVSxHQUFHLGFBQWEsQ0FBQTtJQXlCL0MsQ0FBQztJQXZCVSxPQUFPO1FBQ1YsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLDhDQUE4QyxFQUFFLENBQUE7SUFDOUYsQ0FBQztJQUVNLElBQUksQ0FBQyxHQUFTLEVBQUUsUUFBZ0IsSUFBVSxDQUFDO0lBRTNDLE9BQU8sQ0FBQyxHQUFXO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBVyxFQUFFLE1BQW1CLEVBQUUsTUFBdUIsRUFBRSxNQUFzQixFQUFFLE1BQWtCLEVBQUUsUUFBdUI7UUFDL0ksSUFBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUM7WUFDL0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLG9DQUFvQyxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBUSxDQUFDO1lBQ2xFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2lCQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO2lCQUNqQixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQzVCO2FBRUQ7WUFDSSxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsdUdBQXVHLENBQUMsQ0FBQztTQUMvSTtJQUNMLENBQUM7Q0FDSjtBQTFCRCxnQ0EwQkMifQ==