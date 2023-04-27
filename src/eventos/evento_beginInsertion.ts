import TelegramBot, { Message } from "node-telegram-bot-api";
import { Socket } from "socket.io-client";
import ChatClass from "../utilidades/chats-array";

export default async (
  socket: Socket,
  bot: TelegramBot,
  groupTelegram: any,
  data: any
) => {
  await ChatClass.loadChats();
  const chat = await ChatClass.getChat(data[0].id_hash);
  const { id_cart, seller } = data[0];
  const sellerName =
    `${seller.name_seller} ${seller.last_name_seller}`.toLocaleUpperCase();
  try {
    if (chat != undefined) {
      const message = await bot.editMessageText(
        `InsertFolio : ${data[0].id_hash}
       Seller : ${sellerName}
       Cart : ${id_cart}
       Status : Inserting
       `,
        {
          chat_id: chat.message.chat.id,
          message_id: chat.message.message_id,
        }
      );
      await ChatClass.updateChat({
        hashId: data[0].id_hash,
        message: message as Message,
        cartId: id_cart,
        user: sellerName,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
