import { prisma } from "@/database/prisma.js";
import { JoinRoomDTO } from "../dtos/joinRoom.dto.js";

export class JoinRoomService {
  async execute({ roomCode, playerName }: JoinRoomDTO) {
    const room = await prisma.room.findUnique({
      where: { code: roomCode },
      include: { players: true },
    });

    if (!room) throw new Error("Sala não encontrada");

    const player = await prisma.player.create({
      data: {
        name: playerName,
        roomId: room.id,
      },
    });

    return { room, player };
  }
}
