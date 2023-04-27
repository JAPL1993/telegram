import TelegramBot, { Message } from "node-telegram-bot-api";
import { Socket } from "socket.io-client";
import { chatArray, ChatObjet } from "../utilidades/chats-array";

export default async (
  socket: Socket,
  bot: TelegramBot,
  groupTelegram: any,
  data: any
) => {
  const index = chatArray.findIndex(
    (item: ChatObjet) => item.hashId === data.id_hash
  );
  if (index == -1) {
    try {
      const message = await bot.sendMessage(
        groupTelegram,
        `InsertFolio: ${data.id_hash}`
      );
      chatArray.push({
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
          chat_id: chatArray[index].message.chat.id,
          message_id: chatArray[index].message.message_id,
        }
      );
      chatArray[index].message = message as Message;
    } catch (error) {
      console.log(error);
    }
  }
};
