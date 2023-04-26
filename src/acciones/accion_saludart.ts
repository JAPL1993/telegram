import TelegramBot, { Message } from "node-telegram-bot-api";

export default (msg: Message, bot: TelegramBot) => {
  console.log(msg);
  bot.sendMessage(msg.chat.id, "Hello");
};
