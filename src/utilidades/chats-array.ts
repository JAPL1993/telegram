import { Message } from "node-telegram-bot-api";

export interface ChatObjet {
  hashId: string;
  cartId?: number | null;
  user?: string | null;
  message: Message;
}

export const chatArray: ChatObjet[] = [];
