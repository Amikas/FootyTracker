/*
  Warnings:

  - You are about to drop the `EventAttachment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventAttachment" DROP CONSTRAINT "EventAttachment_eventId_fkey";

-- DropTable
DROP TABLE "EventAttachment";
