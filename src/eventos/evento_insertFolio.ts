import TelegramBot from "node-telegram-bot-api";
import { Socket } from "socket.io-client";

export default (
  socket: Socket,
  bot: TelegramBot,
  groupTelegram: any,
  data: any
) => {
  bot.sendMessage(groupTelegram, `InsertFolio: ${data.id_hash}`);
};
