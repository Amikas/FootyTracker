/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `FitbitActivity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FitbitActivity_date_key" ON "FitbitActivity"("date");
