import { Server } from "socket.io";
import { registerRoomEvents } from "./roomEvents.js";

let io: Server;

export function setupWebsocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  console.log("🔌 WebSocket iniciado!");

  io.on("connection", (socket) => {
    console.log("🟢 Cliente conectado:", socket.id);

    // registra eventos da sala
    registerRoomEvents(io, socket);

    socket.on("disconnect", () => {
      console.log("🔴 Cliente desconectado:", socket.id);
    });
  });
}

export { io };
