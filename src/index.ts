import TelegramBot, { Message } from "node-telegram-bot-api";
import { readdirSync } from "fs";
import { io, Socket } from "socket.io-client";
import * as dotenv from "dotenv";
dotenv.config();
type ObjetoDeFunciones = { [clave: string]: (...args: any[]) => any };

const token: string = process.env.TOKEN_TELEGRAM || "";

const bot: TelegramBot = new TelegramBot(token, { polling: true });
const groupTelegram = process.env.GROUP_TELEGRAM || "";
// Carga dinámica de acciones
const acciones: ObjetoDeFunciones = {};
const archivosAcciones = readdirSync("./src/acciones");
const eventos: ObjetoDeFunciones = {};
const archivosEventos = readdirSync("./src/eventos");
archivosAcciones
  .filter((nombreArchivo) => nombreArchivo.startsWith("accion_"))
  .forEach((nombreArchivo) => {
    const nombreAccion = nombreArchivo.replace(".ts", "");
    acciones[nombreAccion] = require(`./acciones/${nombreAccion}`).default;
  });
archivosEventos
  .filter((nombreArchivo) => nombreArchivo.startsWith("evento_"))
  .forEach((nombreArchivo) => {
    const nombreEvento = nombreArchivo.replace(".ts", "");
    eventos[nombreEvento] = require(`./eventos/${nombreEvento}`).default;
  });
// Manejador de mensajes
bot.on("message", async (msg: Message) => {
  // Evento de Bienvenida y Despedida
  if (msg.new_chat_members != undefined) {
    for (const iterator of msg.new_chat_members) {
      bot.sendMessage(
        msg.chat.id,
        `Hola ${iterator.first_name} Bienvenido al grupo`
      );
    }
  }
  if (msg.left_chat_member != undefined) {
    bot.sendMessage(
      msg.chat.id,
      `El usuario ${msg.left_chat_member.first_name} abandonó el grupo`
    );
  }
  // Comprueba si el mensaje tiene un comando y ejecuta la acción correspondiente
  if (msg.text != undefined) {
    if (msg.text.startsWith("/")) {
      const comando = msg.text.substring(1).split(" ")[0];
      const nombreAccion = `accion_${comando}`;
      if (nombreAccion in acciones) {
        await acciones[nombreAccion](msg, bot);
      }
    }
  }
});

// Cliente de Socket io
const socket: Socket = io(`${process.env.SERVER_SOCKET_IO}`);

// Comprobar que se conecta al socket
socket.on("connect", () => {
  bot.sendMessage(groupTelegram, "Conectado al servido en namespace microsip");
});

socket.onAny(async (event: string, data: any) => {
  const nombreEvento = `evento_${event}`;
  if (nombreEvento in eventos) {
    await eventos[nombreEvento](socket, bot, groupTelegram, data);
  }
});
