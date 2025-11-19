import { io } from "socket.io-client";

export const socket = io("http://localhost:3333", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("🟢 Conectado ao servidor WebSocket! ID:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("🔴 Erro na conexão WS:", err.message);
});
