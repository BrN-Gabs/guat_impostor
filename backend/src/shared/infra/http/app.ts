import express from "express";
import cors from "cors";
import { roomRoutes } from "@/modules/room/index.js";

const app = express();

app.use(cors());
app.use(express.json());

// rota base
app.get("/", (req, res) => {
  return res.json({ message: "Servidor do Impostor no ar!" });
});

// rotas do módulo room
app.use("/room", roomRoutes);

export { app };
