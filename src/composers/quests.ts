import { InlineKeyboard, Composer } from "grammy";
import { MyContext } from "../types/types.js";
import { questsImgType, IItem } from "../types/quests.js";
import questsImg from "../json/quests.json" with { type: "json" };

const quests = new Composer<MyContext>();
const data = questsImg as questsImgType;

const main = async (ctx: MyContext, key: string, item: IItem) => {
    const keyNum = Number(key);
    const total = 6;
    const prevKey = keyNum === 1 ? total : keyNum - 1;
    const nextKey = keyNum === total ? 1 : keyNum + 1;

    try {
        await ctx.replyWithPhoto(item.img, {
            caption: `${item.title}`,
            reply_markup: new InlineKeyboard()
                .text("👉 Начать этот квест", "egypt")
                .row()
                .text("◀️  Назад", `quest${prevKey}`)
                .text(`📜 ${keyNum}/6`, `${item.id}${key}`)
                .text("Вперед ▶️", `quest${nextKey}`)
                .row()
                .text("🏛️ В начало", "start"),
            parse_mode: "HTML",
            protect_content: true,
        });
    } catch (e) {
        console.log(e);
    }
};

const info = async (ctx: MyContext, key: string, item: IItem) => {
    try {
        await ctx.replyWithPhoto(item.img, {
            caption: `${item.info}`,
            reply_markup: new InlineKeyboard()
                .row()
                .text("🏛️ Назад", `quest${key}`),
            parse_mode: "HTML",
            protect_content: true,
        });
    } catch (e) {
        console.log(e);
    }
};

for (const [key, item] of Object.entries(data)) {
    console.log(key, item.title, item.img);

    quests.callbackQuery([`quest${key}`], async (ctx: MyContext) => {
        await ctx.answerCallbackQuery();
        await main(ctx, key, item);
    });

    quests.callbackQuery([`${item.id}${key}`], async (ctx: MyContext) => {
        await ctx.answerCallbackQuery();
        await info(ctx, key, item);
    });
}

quests.command("quest", async (ctx: MyContext) => {
    main(ctx, "1", questsImg["1"]);
});

export { quests };
