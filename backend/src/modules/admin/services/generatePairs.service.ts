// src/modules/admin/services/generatePairs.service.ts
import fs from "fs";
import path from "path";
import { prisma } from "@/database/prisma.js";

export class GeneratePairsService {
  async generate(type: "word" | "question") {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      type === "word" ? "wordPairs.json" : "questionPairs.json"
    );

    if (!fs.existsSync(filePath)) {
      throw new Error(`Arquivo não encontrado: ${filePath}`);
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const list = JSON.parse(raw);

    if (!Array.isArray(list)) {
      throw new Error("JSON inválido — precisa ser um array.");
    }

    if (type === "word") {
      await prisma.wordPair.createMany({
        data: list,
        skipDuplicates: true
      });
    } else {
      await prisma.questionPair.createMany({
        data: list,
        skipDuplicates: true
      });
    }

    return list;
  }
}
