import TelegramBot, { Message } from "node-telegram-bot-api";
import { Socket } from "socket.io-client";
import { chatArray } from "../utilidades/chats-array";
export default async (
  socket: Socket,
  bot: TelegramBot,
  groupTelegram: any,
  data: any
) => {
  const index = chatArray.findIndex(
    (item: any) => item.id_hash == data.id_hash
  );
  try {
    const message = await bot.editMessageText(
      `${chatArray[index].message.text}
    ERROR AL INSERTAR EL EVENTO.
       `,
      {
        chat_id: chatArray[index].message.chat.id,
        message_id: chatArray[index].message.message_id,
      }
    );
    chatArray[index].message = message as Message;
  } catch (error) {
    console.log(error);
  }
};
