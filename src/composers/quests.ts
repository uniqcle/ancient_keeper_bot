import path from "node:path";
import { InlineKeyboard, Composer, InputFile } from "grammy";
import { MyContext } from "../types/types.js";
import { questsDataType, IItem } from "../types/quests.js";
import questsData from "../json/quests.json" with { type: "json" };

const quests = new Composer<MyContext>();
const data = questsData as questsDataType;
const DOMAIN_URL: string | undefined = process.env.DOMAIN_URL;

if (!DOMAIN_URL) {
    throw new Error("Переменная окружения URL не задана!");
}

const main = async (ctx: MyContext, key: string, item: IItem) => {
    const keyNum = Number(key);
    const total = 6;
    const prevKey = keyNum === 1 ? total : keyNum - 1;
    const nextKey = keyNum === total ? 1 : keyNum + 1;

    //const imgPath = path.resolve("/images", item.id, item.img);
    //const imgPath = path.join("images", item.id, item.img);
    //console.log(new InputFile(imgPath));

    try {
        console.log("Данные: ", DOMAIN_URL);
        const imageUrl = new URL(`images/${item.id}/${item.img}`, DOMAIN_URL)
            .href;

        await ctx.replyWithPhoto(imageUrl, {
            caption: `${item.title}`,
            reply_markup: new InlineKeyboard()
                .text("👉 Начать этот квест!", item.id)
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
        console.log(URL);
        await ctx.replyWithPhoto(URL + item.img, {
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
    main(ctx, "1", questsData["1"]);
});

export { quests };
