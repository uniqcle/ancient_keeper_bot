export const start = async (ctx: MyContext) => {
	if (!ctx.from) {
		return ctx.reply("User info is not available");
	}

	const { id, first_name, username } = ctx.from;

	try {
		const keyboard = new InlineKeyboard().text("Меню", "menu");

		const existingUser = await User.findOne({ t_id: id });
		if (existingUser) {
			return ctx.reply("Вы уже зарегестрированы!", {
				reply_markup: keyboard,
			});
		}

		const newUser = new User({
			t_id: id,
			first_name,
			username,
		});

		newUser.save();

		return ctx.reply("Вы успешно зарегестрированы!", {
			reply_markup: keyboard,
		});

	} catch (error) {
		console.error("Ошибка при регистрации!", error);
		ctx.reply("Произошла ошибка!");
	}

	ctx.reply("Привет! Отправь мне любой текст, и я его повторю.");
};