import { Request, Response } from "express";
import { JoinRoomService } from "../services/joinRoom.service.js";

export class JoinRoomController {
  async handle(req: Request, res: Response) {
    try {
      const service = new JoinRoomService();
      const result = await service.execute(req.body);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
