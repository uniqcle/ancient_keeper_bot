import { InlineKeyboard, Composer } from 'grammy';
import { MyContext } from "../types/types.js";
import { ITombData, StageType, IOptions } from "../types/tomb.js"; 
import tombsData from "../json/tomb.json" with {type: "json"}

const tomb = new Composer<MyContext>(); 


const main = async (ctx: MyContext, key: string, stage: StageType) => {
	const keyNum = Number(key); 
	const nextNum = Number(stage.next)

	const keyBoardOptions = (options: IOptions[]) => {
        return new InlineKeyboard()
            .text(options[0].text, options[0].id)
            .text(options[1].text, options[1].id)
            .row()
			.text(options[2].text, options[2].id)
		    .text(options[3].text, options[3].id)
    };
	
	
	try {
        await ctx.replyWithPhoto(stage.pages[0].img, {
            caption: stage.pages[0].text,
            reply_markup: keyBoardOptions(stage.pages[0].optionButton),
            parse_mode: "HTML",
            protect_content: true,
        });
		
		console.log(stage)
    } catch (e) {
        console.log(e);
    }
};


for (const [key, stage] of Object.entries(tombsData.stages)) {
	tomb.callbackQuery("tomb", async (ctx: MyContext) => {
	await ctx.answerCallbackQuery(); 

	await main(ctx, key, stage);
})
}



export {tomb}