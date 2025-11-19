import { prisma } from "@/database/prisma.js";
import { generateRoomCode } from "@/shared/utils/generateRoomCode.js";
import { CreateRoomDTO } from "../dtos/createRoom.dto.js";

export class CreateRoomService {
  async execute({ mode }: CreateRoomDTO) {
    const code = generateRoomCode();

    const room = await prisma.room.create({
      data: {
        code,
        mode,
      },
    });

    return room;
  }
}
