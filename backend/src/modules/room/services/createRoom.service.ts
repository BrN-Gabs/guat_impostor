import { prisma } from "@/database/prisma.js";

export class CreateRoomService {
  async execute(mode: "word" | "question") {
    const code = Math.random().toString(36).substring(2, 7).toUpperCase();

    const room = await prisma.room.create({
      data: {
        code,
        mode,
      }
    });

    return room;
  }
}
