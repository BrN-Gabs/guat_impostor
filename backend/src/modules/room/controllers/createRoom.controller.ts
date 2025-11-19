import { Request, Response } from "express";
import { CreateRoomService } from "../services/createRoom.service.js";

export class CreateRoomController {
  async handle(req: Request, res: Response) {
    try {
      const service = new CreateRoomService();
      const room = await service.execute(req.body);
      return res.json(room);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
