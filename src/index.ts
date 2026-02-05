import "dotenv/config";
import { Bot, GrammyError, HttpError, InlineKeyboard } from "grammy";
import { hydrate } from "@grammyjs/hydrate";
import { limit } from "@grammyjs/ratelimiter";
import mongoose from "mongoose";
import { MyContext } from "./types/types.js";
import { start, quests, tomb } from "./composers/index.js";
import commandsJson from "./json/commands.json" with { type: "json" };
import express from "express";
import { fileURLToPath } from "node:url";
import path, { dirname, join } from "node:path";

const BOT_API_KEY = process.env.BOT_TOKEN;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (!BOT_API_KEY) {
    throw new Error("BOT_API_KEY is not defined");
}

const bot = new Bot<MyContext>(BOT_API_KEY);
const app = express();

app.set("view engine", "ejs");
//app.set("views", path.resolve(__dirname, "templates")); //установка папки шаблона
//console.log('Текущий каталог: ', app.get("views"));

console.log(path.join(__dirname, "..", "images"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "..", "images")));

bot.api.setMyCommands(commandsJson);

bot.use(limit());
bot.use(hydrate());
//bot.use(userAuth);
bot.use(start);
bot.use(quests);
bot.use(tomb);

app.get("/", (req, res) => {
    res.send('<img src="/images/start.png" alt="start">');
});

// bot.callbackQuery("menu", async (ctx) => {
//     await ctx.answerCallbackQuery();

//     ctx.callbackQuery.message?.editText(
//         "Вы в главном меню\n Отсюда вы можете попасть"
//     );
// });

// Ответ на любое сообщение
bot.on("message:text", async (ctx) => {
    console.log("Обработка текста" + ctx.message.text);
    console.log(ctx.from);
    await ctx.reply(ctx.message.text);
});

// Обработка ошибок согласно документации
bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;

    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});

// Функция запуска бота
async function startBot() {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined");
    }
    try {
        await mongoose.connect(MONGODB_URI);

        bot.start();
        console.log("MongoDb connected & Bot started");
    } catch (error) {
        console.error("Error in startBot:", error);
    }
}

startBot();

app.listen("3000", async () => {
    console.log("webserver is working...");
    //await bot.api.setWebhook(`${URL}/bot${TOKEN}`);
});
