-- CreateTable
CREATE TABLE "WordPair" (
    "id" SERIAL NOT NULL,
    "groupWord" TEXT NOT NULL,
    "impostorWord" TEXT NOT NULL,

    CONSTRAINT "WordPair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionPair" (
    "id" SERIAL NOT NULL,
    "groupQuestion" TEXT NOT NULL,
    "impostorQuestion" TEXT NOT NULL,

    CONSTRAINT "QuestionPair_pkey" PRIMARY KEY ("id")
);
