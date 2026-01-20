import {
    Bot,
    GrammyError,
    HttpError,
    InlineKeyboard,
    InputFile,
    Composer,
} from "grammy";
import { MyContext } from "../types/types.js";

const qwestList = new Composer<MyContext>();

qwestList.callbackQuery("riddles", async (ctx: MyContext) => {
    try {
        await ctx.replyWithPhoto(new InputFile(`images/start.png`), {
            caption: "Списко квестов! Готов начать? 🏺🦉",
            reply_markup: new InlineKeyboard().text("📜 ", "qwests"),
            parse_mode: "HTML",
            protect_content: true,
        });
        await ctx.answerCallbackQuery();
    } catch (e) {
        console.log(e);
    }
});


qwestList.callbackQuery("qwests", async (ctx: MyContext) => {
    try {
        await ctx.replyWithPhoto(new InputFile(`images/start.png`), {
            caption: "Списко квестов! Готов начать? 🏺🦉",
            reply_markup: new InlineKeyboard().text("📜 ", "qwests"),
            parse_mode: "HTML",
            protect_content: true,
        });
        await ctx.answerCallbackQuery();
    } catch (e) {
        console.log(e);
    }
});


export { qwestList };
