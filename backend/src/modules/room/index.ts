import { Router } from "express";
import { prisma } from "@/database/prisma.js";

const roomRoutes = Router();

// rota simples pra testar se o módulo está funcionando
roomRoutes.get("/", (req, res) => {
  return res.json({
    ok: true,
    message: "Rota /room funcionando!",
  });
});

// rota pra testar o Prisma
roomRoutes.get("/test-db", async (req, res) => {
  try {
    const words = await prisma.wordPair.findMany();
    return res.json({
      ok: true,
      count: words.length,
      data: words,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: "Erro ao acessar o banco" });
  }
});

export { roomRoutes };
