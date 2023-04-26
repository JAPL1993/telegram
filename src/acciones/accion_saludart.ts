import TelegramBot, { Message } from "node-telegram-bot-api";

export default (msg: Message, bot: TelegramBot) => {
  bot.sendMessage(msg.chat.id, `${msg}`);
};
