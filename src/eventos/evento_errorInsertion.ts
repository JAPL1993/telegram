import TelegramBot, { Message } from "node-telegram-bot-api";
import { Socket } from "socket.io-client";
import ChatClass from "../utilidades/chats-array";
export default async (
  socket: Socket,
  bot: TelegramBot,
  groupTelegram: any,
  data: any
) => {
  try {
    await ChatClass.loadChats();
    const chat = await ChatClass.getChat(data.id_hash);
    if (chat != undefined) {
      const message = await bot.editMessageText(
        `${chat.message.text}
    ERROR AL INSERTAR EL EVENTO.
       `,
        {
          chat_id: chat.message.chat.id,
          message_id: chat.message.message_id,
        }
      );
      await ChatClass.updateChat({
        hashId: data.id_hash,
        message: message as Message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
