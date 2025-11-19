// src/shared/cache/blacklist.ts

// memória em tempo de execução — zera quando reinicia o servidor
export const blacklist = {
  word: [] as string[],
  question: [] as string[],
  limit: 20, // máximo de itens guardados
};

export function addToBlacklist(mode: "word" | "question", key: string) {
  const arr = blacklist[mode];

  // se já existe, remove e coloca no fim
  const existingIndex = arr.indexOf(key);
  if (existingIndex !== -1) arr.splice(existingIndex, 1);

  arr.push(key);

  // respeita limite
  if (arr.length > blacklist.limit) {
    arr.shift();
  }
}

export function isBlacklisted(mode: "word" | "question", key: string) {
  return blacklist[mode].includes(key);
}
