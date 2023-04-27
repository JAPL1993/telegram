import { Message } from "node-telegram-bot-api";
import { readJson, writeJson } from "fs-extra";
export interface ChatObjet {
  hashId: string;
  cartId?: number | null;
  user?: string | null;
  message: Message;
}

class Singleton {
  private static instance: Singleton;
  public chatArray: ChatObjet[] = [];
  private chatFile = "chats.json";
  private constructor() {
    // Aquí van las inicializaciones necesarias
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public async loadChats() {
    try {
      this.chatArray = await readJson(this.chatFile);
    } catch (error) {
      this.chatArray = [];
    }
  }

  public async saveChats() {
    await writeJson(this.chatFile, this.chatArray);
  }

  public async addChat(chat: ChatObjet) {
    this.chatArray.push(chat);
    await this.saveChats();
  }

  public async deleteChat(hashId: string) {
    this.chatArray = this.chatArray.filter((chat) => chat.hashId !== hashId);
    await this.saveChats();
  }

  public async getChat(hashId: string) {
    return this.chatArray.find((chat) => chat.hashId === hashId);
  }

  public async getChats() {
    return this.chatArray;
  }

  public async updateChat(Chat: ChatObjet) {
    const chat = await this.getChat(Chat.hashId);
    if (chat) {
      chat.cartId = Chat.cartId;
      chat.user = Chat.user;
      chat.message = Chat.message;
      await this.saveChats();
    }
  }

  public async updateChats(chats: ChatObjet[]) {
    this.chatArray = chats;
    await this.saveChats();
  }

  public async deleteChats() {
    this.chatArray = [];
    await this.saveChats();
  }
}

export default Singleton.getInstance();
