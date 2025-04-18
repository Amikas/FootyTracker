/*
  Warnings:

  - The primary key for the `Goal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `currentValue` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `targetValue` on the `Goal` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_userId_fkey";

-- AlterTable
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_pkey",
DROP COLUMN "currentValue",
DROP COLUMN "description",
DROP COLUMN "dueDate",
DROP COLUMN "targetValue",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "target" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Goal_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Goal_id_seq";
