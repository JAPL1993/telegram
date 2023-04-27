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
    (item: any) => item.id_hash == data[0].id_hash
  );
  const { id_cart, seller } = data[0];
  const sellerName =
    `${seller.name_seller} ${seller.last_name_seller}`.toLocaleUpperCase();
  try {
    const message = await bot.editMessageText(
      `InsertFolio : ${data.id_hash}
       Seller : ${sellerName}
       Cart : ${id_cart}
       Status : Inserting
       `,
      {
        chat_id: chatArray[index].message.chat.id,
        message_id: chatArray[index].message.message_id,
      }
    );
    chatArray[index].message = message as Message;
    chatArray[index].cartId = id_cart;
    chatArray[index].user = seller;
  } catch (error) {
    console.log(error);
  }
};
