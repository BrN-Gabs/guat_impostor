import { Request, Response } from "express";
import { CreateRoomService } from "../services/createRoom.service.js";

export class CreateRoomController {
  async handle(req: Request, res: Response) {
    const { mode } = req.body;

    if (!mode || (mode !== "word" && mode !== "question")) {
      return res.status(400).json({ error: "Modo inválido" });
    }

    const service = new CreateRoomService();
    const room = await service.execute(mode);

    return res.json(room);
  }
}
