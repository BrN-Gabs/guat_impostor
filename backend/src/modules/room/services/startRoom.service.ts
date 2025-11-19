import { prisma } from "@/database/prisma.js";
import { selectRandomPair } from "../../../shared/utils/selectRandomPair.js";
import { GeneratePairsService } from "@/modules/admin/services/generatePairs.service.js";
import { StartRoomDTO } from "../dtos/startRoom.dto.js";

export class StartRoomService {
  async execute({ roomCode }: StartRoomDTO) {
    const room = await prisma.room.findUnique({ where: { code: roomCode }, include: { players: true } });
    if (!room) throw new Error("Sala não existe");

    if (room.players.length < 3) throw new Error("São necessários pelo menos 3 jogadores");

    // Lock simples
    if ((StartRoomService as any)._locks?.[room.id]) {
      throw new Error("Geração em andamento - aguarde um momento");
    }
    (StartRoomService as any)._locks = (StartRoomService as any)._locks || {};
    (StartRoomService as any)._locks[room.id] = true;

    try {
      const count = room.mode === "word"
        ? await prisma.wordPair.count()
        : await prisma.questionPair.count();

      // Se o banco estiver vazio, importa do JSON
      if (count < 1) {
        const gen = new GeneratePairsService();
        await gen.generate(room.mode as "word" | "question");
      }

      // Seleciona par
      const pair = await selectRandomPair(room.mode as "word" | "question");

      // Escolhe impostor
      const randomIndex = Math.floor(Math.random() * room.players.length);
      const impostor = room.players[randomIndex];
      await prisma.player.update({ where: { id: impostor.id }, data: { isImpostor: true } });

      return {
        impostorId: impostor.id,
        groupItem: room.mode === "word" ? pair?.groupWord : pair?.groupQuestion,
        impostorItem: room.mode === "word" ? pair?.impostorWord : pair?.impostorQuestion,
      };

    } finally {
      delete (StartRoomService as any)._locks[room.id];
    }
  }
}
