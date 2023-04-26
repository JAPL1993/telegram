import TelegramBot, { Message } from "node-telegram-bot-api";

export default (msg: Message, bot: TelegramBot) => {
  const imageqr =
    "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" +
    msg.text!.substring(3).trim();
  bot.sendMessage(
    msg.chat.id,
    "[✏️](" + imageqr + ")Qr code de: " + msg.text!.substring(3).trim(),
    {
      parse_mode: "Markdown",
    }
  );
};
