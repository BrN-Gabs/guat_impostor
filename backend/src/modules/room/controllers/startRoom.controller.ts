import { Request, Response } from "express";
import { StartRoomService } from "../services/startRoom.service.js";

export class StartRoomController {
  async handle(req: Request, res: Response) {
    try {
      const service = new StartRoomService();
      const result = await service.execute(req.body);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
