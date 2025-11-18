import { Router } from "express";
import { CreateRoomController } from "../controllers/createRoom.controller.js";

const router = Router();

router.post("/create", new CreateRoomController().handle);

export default router;
