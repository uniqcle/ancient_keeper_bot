import { InlineKeyboard } from "grammy";
import {
    ITombData,
    StageType,
    NextButtonsType,
    OptionButtonsType,
} from "./tomb.js";

const keyBoardOptionsButtons = (
    options: OptionButtonsType[],
): InlineKeyboard => {
    return new InlineKeyboard()
        .text(options[0].text, options[0].option)
        .text(options[1].text, options[1].option)
        .row()
        .text(options[2].text, options[2].option)
        .text(options[3].text, options[3].option);
};

const keyBoardNextButtons = (next: NextButtonsType[]): InlineKeyboard => {
    return new InlineKeyboard()
        .text(next[0].text, next[0].next)
        .row()
        .text(next[1].text, next[1].next);
};


export { keyBoardOptionsButtons, keyBoardNextButtons };
