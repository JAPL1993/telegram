import TelegramBot, { Message } from "node-telegram-bot-api";
import { Socket } from "socket.io-client";
import ChatClass, { ChatObjet } from "../utilidades/chats-array";

export default async (
  socket: Socket,
  bot: TelegramBot,
  groupTelegram: any,
  data: any
) => {
  await ChatClass.loadChats();
  const chat: ChatObjet | undefined = await ChatClass.getChat(data.id_hash);
  if (chat == undefined) {
    try {
      const message = await bot.sendMessage(
        groupTelegram,
        `InsertFolio: ${data.id_hash}`
      );
      await ChatClass.addChat({
        hashId: data.id_hash,
        message: message,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const message = await bot.editMessageText(
        `InsertFolio intentando de nuevo: ${data.id_hash}`,
        {
          chat_id: chat.message.chat.id,
          message_id: chat.message.message_id,
        }
      );
      await ChatClass.updateChat({
        hashId: data.id_hash,
        message: message as Message,
      });
    } catch (error) {
      console.log(error);
    }
  }
};
