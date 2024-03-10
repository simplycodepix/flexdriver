/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ScheduleDays" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- AlterTable
ALTER TABLE "StationFilter" ADD COLUMN     "daysOfWeek" "ScheduleDays"[];

-- DropTable
DROP TABLE "Example";
