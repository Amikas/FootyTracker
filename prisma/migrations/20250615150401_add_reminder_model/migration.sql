/*
  Warnings:

  - You are about to drop the column `dateTime` on the `Reminder` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Reminder` table. All the data in the column will be lost.
  - You are about to drop the column `recurring` on the `Reminder` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Reminder` table. All the data in the column will be lost.
  - Added the required column `category` to the `Reminder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Reminder` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReminderCategory" AS ENUM ('TRAINING', 'GOALS', 'GENERAL');

-- DropForeignKey
ALTER TABLE "Reminder" DROP CONSTRAINT "Reminder_userId_fkey";

-- AlterTable
ALTER TABLE "Reminder" DROP COLUMN "dateTime",
DROP COLUMN "message",
DROP COLUMN "recurring",
DROP COLUMN "type",
ADD COLUMN     "category" "ReminderCategory" NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "frequency" TEXT,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRecurring" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastTriggered" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Reminder_userId_idx" ON "Reminder"("userId");

-- CreateIndex
CREATE INDEX "Reminder_date_idx" ON "Reminder"("date");

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
