-- CreateTable
CREATE TABLE "EmailSetting" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "provider" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailSetting_pkey" PRIMARY KEY ("id")
);
