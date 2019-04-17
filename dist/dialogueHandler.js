"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class dialogueHandler {
    constructor(steps, data) {
        this._steps = steps;
        this._data = data;
        this._endEarly = false;
    }
    async GetInput(channel, ticketUser, config) {
        if (!Array.isArray(this._steps)) {
            this._steps = [this._steps];
        }
        for (const step of this._steps) {
            const filter = m => (m.member == ticketUser);
            let response, beforeM;
            channel.send(ticketUser + ", " + step.beforeMessage).then(newMsg => {
                beforeM = newMsg;
            });
            await channel.awaitMessages(filter, { max: 1 })
                .then(collected => {
                response = collected.array()[0];
                if (step.callback != null) {
                    [this._data, this._endEarly] = step.callback(response.content, this._data, this._endEarly);
                }
                if (step.httpCallback != null) {
                    this._data = step.httpCallback(response.content, this._data, ticketUser, config);
                }
                console.log("DH " + this._endEarly);
            })
                .catch(collected => {
                console.log(console.error(collected));
                channel.send(step.errorMessage);
            });
            beforeM.delete(0);
            response.delete(0);
            if (this._endEarly == true) {
                return this._data;
            }
        }
        return this._data;
    }
}
exports.dialogueHandler = dialogueHandler;
class dialogueStep {
    constructor(beforeMessage, succeedMessage, errorMessage, callback, httpCallback, editMessage) {
        this.callback = callback;
        this.httpCallback = httpCallback;
        this.beforeMessage = beforeMessage;
        this.succeedMessage = succeedMessage;
        this.errorMessage = errorMessage;
        this.editMessage = editMessage;
    }
}
exports.dialogueStep = dialogueStep;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9ndWVIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RpYWxvZ3VlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLE1BQWEsZUFBZTtJQVF4QixZQUFZLEtBQW9DLEVBQUUsSUFBUztRQUN2RCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUUzQixDQUFDO0lBRU0sS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUE0QixFQUFFLFVBQStCLEVBQUUsTUFBc0I7UUFFdkcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0I7UUFDRCxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDNUIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksVUFBVSxDQUFDLENBQUM7WUFFN0MsSUFBSSxRQUFRLEVBQUUsT0FBTyxDQUFDO1lBRXRCLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMvRCxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRyxDQUFDLEVBQUMsQ0FBQztpQkFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNkLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRWhDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUM7b0JBQ3JCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUUvRjtnQkFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxFQUFDO29CQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDcEY7Z0JBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBS3ZDLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7Z0JBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUM7Z0JBQ3RCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQzthQUNyQjtTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBRXRCLENBQUM7Q0FDSjtBQTlERCwwQ0E4REM7QUFFRCxNQUFhLFlBQVk7SUFJckIsWUFBWSxhQUFxQixFQUFFLGNBQXVCLEVBQUUsWUFBcUIsRUFBRSxRQUFtQixFQUFFLFlBQXVCLEVBQUUsV0FBcUI7UUFDbEosSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDbkMsQ0FBQztDQUNKO0FBWkQsb0NBWUMifQ==