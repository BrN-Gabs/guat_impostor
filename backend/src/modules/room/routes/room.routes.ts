import { Router } from "express";
import { CreateRoomController } from "../controllers/createRoom.controller.js";
import { JoinRoomController } from "../controllers/joinRoom.controller.js";
import { StartRoomController } from "../controllers/startRoom.controller.js";

const router = Router();

router.post("/create", new CreateRoomController().handle);
router.post("/join", new JoinRoomController().handle);
router.post("/start", new StartRoomController().handle);

export default router;
