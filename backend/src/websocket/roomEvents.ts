import { Server, Socket } from "socket.io";

export function registerRoomEvents(io: Server, socket: Socket) {
  // entrar na sala
  socket.on("room:join", ({ roomCode, playerName }) => {
    socket.join(roomCode);

    // avisa os outros jogadores
    socket.to(roomCode).emit("room:playerJoined", {
      id: socket.id,
      name: playerName,
    });

    console.log(`👤 ${playerName} entrou na sala ${roomCode}`);
  });

  // iniciar a sala (notificação)
  socket.on("room:start", ({ roomCode }) => {
    io.to(roomCode).emit("room:started");
    console.log(`🚀 Sala ${roomCode} foi iniciada`);
  });
}
