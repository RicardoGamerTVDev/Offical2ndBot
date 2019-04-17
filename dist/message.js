"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class BotMessage {
    constructor(user) {
        this.user = user;
    }
    isValid() {
        return !!this.text || !!this.richText;
    }
    setTextOnly(text) {
        if (this.richText) {
            throw new Error('one of rich text methods was used');
        }
        this.text = text;
        return this;
    }
    addField(name, value, inline) {
        this.validateRichText().addField(name, value, inline);
        return this;
    }
    addBlankField() {
        this.validateRichText().addBlankField();
        return this;
    }
    setColor(color) {
        this.validateRichText().setColor(color);
        return this;
    }
    setDescription(description) {
        this.validateRichText().setDescription(description);
        return this;
    }
    setFooter(text, icon) {
        this.validateRichText().setFooter(text, icon);
        return this;
    }
    setImage(url) {
        this.validateRichText().setImage(url);
        return this;
    }
    setThumbnail(url) {
        this.validateRichText().setThumbnail(url);
        return this;
    }
    setTitle(title) {
        this.validateRichText().setTitle(title);
        return this;
    }
    setURL(url) {
        this.validateRichText().setURL(url);
        return this;
    }
    validateRichText() {
        if (this.text) {
            throw new Error('setTextOnly method was used');
        }
        if (!this.richText) {
            this.richText = new discord_js_1.RichEmbed();
        }
        return this.richText;
    }
}
exports.BotMessage = BotMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQXNDO0FBR3RDLE1BQWEsVUFBVTtJQUtuQixZQUFZLElBQVc7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7SUFDcEIsQ0FBQztJQUVNLE9BQU87UUFDVixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFBO0lBQ3pDLENBQUM7SUFFTSxXQUFXLENBQUMsSUFBWTtRQUMzQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUE7U0FBRTtRQUMzRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7SUFFTSxRQUFRLENBQUMsSUFBWSxFQUFFLEtBQWEsRUFBRSxNQUFlO1FBQ3hELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3JELE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUVNLGFBQWE7UUFDaEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDdkMsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBRU0sUUFBUSxDQUFDLEtBQWlEO1FBQzdELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN2QyxPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7SUFFTSxjQUFjLENBQUMsV0FBbUI7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ25ELE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUVNLFNBQVMsQ0FBQyxJQUFZLEVBQUUsSUFBeUI7UUFDcEQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUM3QyxPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7SUFFTSxRQUFRLENBQUMsR0FBVztRQUN2QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDckMsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBRU0sWUFBWSxDQUFDLEdBQVc7UUFDM0IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3pDLE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUVNLFFBQVEsQ0FBQyxLQUFhO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN2QyxPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7SUFFTSxNQUFNLENBQUMsR0FBVztRQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbkMsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBRU8sZ0JBQWdCO1FBQ3BCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtTQUFFO1FBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHNCQUFTLEVBQUUsQ0FBQTtTQUFFO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUN4QixDQUFDO0NBQ0o7QUFyRUQsZ0NBcUVDIn0=