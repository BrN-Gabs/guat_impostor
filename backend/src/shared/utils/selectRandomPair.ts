// src/shared/utils/selectRandomPair.ts

import { prisma } from "@/database/prisma.js";
import { isBlacklisted, addToBlacklist } from "@/shared/cache/blacklist.js";

export async function selectRandomPair(mode: "word" | "question") {
  const table = mode === "word" ? prisma.wordPair : prisma.questionPair;

  const items = await table.findMany();
  if (!items.length) return null;

  // tenta no máximo 20 vezes encontrar um par não bloqueado
  for (let i = 0; i < 20; i++) {
    const random = items[Math.floor(Math.random() * items.length)];

    const key =
      mode === "word"
        ? `${random.groupWord}::${random.impostorWord}`
        : `${random.groupQuestion}::${random.impostorQuestion}`;

    if (!isBlacklisted(mode, key)) {
      addToBlacklist(mode, key);
      return random;
    }
  }

  // se não encontrar nenhum (tudo bloqueado),
  // reseta blacklist do modo e retorna um aleatório total
  console.warn(`Blacklist cheia para modo: ${mode}. Resetando.`);

  if (mode === "word") blacklist.word = [];
  else blacklist.question = [];

  const random = items[Math.floor(Math.random() * items.length)];

  const key =
    mode === "word"
      ? `${random.groupWord}::${random.impostorWord}`
      : `${random.groupQuestion}::${random.impostorQuestion}`;

  addToBlacklist(mode, key);
  return random;
}
