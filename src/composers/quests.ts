import { InlineKeyboard, Composer } from "grammy";
import { MyContext } from "../types/types.js";
import questImg from "../json/quests.json" with { type: "json" };

const quests = new Composer<MyContext>();

const main = async (ctx: MyContext) => {
    try {
        await ctx.replyWithPhoto(questImg["1"].url, {
            caption:
                "Тебе проедстоит до нас.\n\nЗдесь нет суеты. Только тишина старинных свитков, свет разума в темноте забвения и ключи — не к сундукам золота, а к себе самому.\n\nДревность не мертва. Прошлое - это ключ к настоящему.\n Готов начать? 🏺🦉",
            reply_markup: new InlineKeyboard()
                .text("👉 Начать этот квест", "scrolls")
                .row()
                .text("◀️  Назад", "scrolls")
                .text("📜 1/7", "quests")
                .text("Вперед ▶️", "scrolls")
                .row()
                .text("🏛️ В начало", "start"),
            parse_mode: "HTML",
            protect_content: true,
        });
    } catch (e) {
        console.log(e);
    }
};

quests.callbackQuery(["quest", "quest1"], async (ctx: MyContext) => {
    await ctx.answerCallbackQuery();
    await main(ctx);
});

quests.command("quest", async (ctx: MyContext) => {
    main(ctx);
});

export { quests };
