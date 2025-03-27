-- CreateTable
CREATE TABLE "FitbitActivity" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "steps" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FitbitActivity_pkey" PRIMARY KEY ("id")
);
