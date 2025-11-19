import express from "express";
import cors from "cors";

import roomRoutes from "@/modules/room/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/room", roomRoutes);

export default app;
