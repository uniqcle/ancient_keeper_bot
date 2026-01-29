import { InlineKeyboard, Composer } from "grammy";
import { MyContext } from "../../types/types.js";
import {    StageType} from "./tomb.js";
import tombsData from "../../json/tomb.json" with { type: "json" };
import { keyBoardOptionsButtons, keyBoardNextButtons } from "./keyboards.js"

const tomb = new Composer<MyContext>();


const main = async (ctx: MyContext, key: string, stage: StageType) => {
    // const keyNum = Number(key);
    // const nextNum = Number(stage.next);

    let keyBoard: InlineKeyboard | undefined = undefined;

    if (stage.nextButtons) {
        keyBoard = keyBoardNextButtons(stage.nextButtons);
    } else if (stage.optionButtons) {
        keyBoard = keyBoardOptionsButtons(stage.optionButtons);
    } else {
        keyBoard = undefined;
    }

    try {
        await ctx.replyWithPhoto(stage.img, {
            caption: stage.text,
            reply_markup: keyBoard,
            parse_mode: "HTML",
            protect_content: true,
        });

        console.log(stage);
    } catch (e) {
        console.log(e);
    }
};

//HACK:
//FIXME: asdfsdafsafd

const answerHandle = (tomb: Composer<MyContext>, stage: StageType) => {
    
	tomb.callbackQuery("tomb2-answer1", async (ctx: MyContext) => {
        await ctx.answerCallbackQuery();

        if ("tomb2-answer1" === stage.correct_answer) {
            console.log(`Ответ верен. Success Answer`);
        } else {
            console.log("ответ не верен. Failed Answer");
        }
    });
};


for (const [key, stage] of Object.entries(tombsData.stages)) {
    tomb.callbackQuery(`tomb${key}`, async (ctx: MyContext) => {
        await ctx.answerCallbackQuery();

        if ("optionButtons" in stage) {
            answerHandle(tomb, stage);
        }

        await main(ctx, key, stage);
    });
}

export { tomb };
