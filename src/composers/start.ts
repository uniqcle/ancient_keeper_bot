import { InlineKeyboard, Composer } from "grammy";
import { MyContext } from "../types/types.js";
import startImg from "../json/start.json" with { type: "json" };

const start = new Composer<MyContext>();

const main = async (ctx: MyContext) => {
    try {
        await ctx.replyWithPhoto(startImg["1"].url, {
            caption:
                "Приветствую тебя, искатель.\n\nЯ — Хранитель Древности. Не музейный смотритель и не просто рассказчик. Я тот, кто бережёт то, что время пытается стереть: мудрость, загадки, голоса тех, кто жил задолго до нас.\n\nЗдесь нет суеты. Только тишина старинных свитков, свет разума в темноте забвения и ключи — не к сундукам золота, а к себе самому.\n\nДревность не мертва. Прошлое - это ключ к настоящему.\n Готов начать? 🏺🦉",
            reply_markup: new InlineKeyboard()
                .text("📜 Загадки Хранителя", "quest1")
                .row()
                .text("🗝️ Тайные свитки", "scrolls")
                .row()
                .text("🏆 Мои трофеи", "trophies")
                .text("💰 Подписка", "premium"),
            parse_mode: "HTML",
            protect_content: true,
        });
    } catch (e) {
        console.log(e);
    }
};

start.command("start", async (ctx: MyContext) => {
    main(ctx);
});

start.callbackQuery("start", async (ctx: MyContext) => {
    await ctx.answerCallbackQuery();

    await main(ctx);
});

export { start };
