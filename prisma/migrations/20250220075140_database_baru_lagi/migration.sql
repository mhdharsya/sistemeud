/*
  Warnings:

  - You are about to drop the `fileaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `malwaretypetable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `riskleveltable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `systemlog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `fileaction` DROP FOREIGN KEY `FileAction_malwareFileId_fkey`;

-- DropForeignKey
ALTER TABLE `report` DROP FOREIGN KEY `Report_analysisResultId_fkey`;

-- DropForeignKey
ALTER TABLE `systemlog` DROP FOREIGN KEY `SystemLog_userId_fkey`;

-- DropTable
DROP TABLE `fileaction`;

-- DropTable
DROP TABLE `malwaretypetable`;

-- DropTable
DROP TABLE `report`;

-- DropTable
DROP TABLE `riskleveltable`;

-- DropTable
DROP TABLE `systemlog`;
