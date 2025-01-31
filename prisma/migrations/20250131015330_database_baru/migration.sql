/*
  Warnings:

  - You are about to drop the column `analysis_date` on the `analysisresult` table. All the data in the column will be lost.
  - You are about to drop the column `analyst_id` on the `analysisresult` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `analysisresult` table. All the data in the column will be lost.
  - You are about to drop the column `malware_file_id` on the `analysisresult` table. All the data in the column will be lost.
  - You are about to drop the column `malware_type_id` on the `analysisresult` table. All the data in the column will be lost.
  - You are about to drop the column `risk_level` on the `analysisresult` table. All the data in the column will be lost.
  - You are about to drop the column `file_hash` on the `malwarefile` table. All the data in the column will be lost.
  - You are about to drop the column `file_size` on the `malwarefile` table. All the data in the column will be lost.
  - You are about to drop the column `file_type` on the `malwarefile` table. All the data in the column will be lost.
  - You are about to drop the column `filename` on the `malwarefile` table. All the data in the column will be lost.
  - You are about to drop the column `upload_date` on the `malwarefile` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `malwarefile` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `malwarefile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.
  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `analysischaracteristic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `analysisreport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `malwarecharacteristic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `malwaretype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recommendation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `risklevel` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[malwareFileId]` on the table `AnalysisResult` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `analysisDetails` to the `AnalysisResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detectedBehaviors` to the `AnalysisResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `malwareFileId` to the `AnalysisResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resultStatus` to the `AnalysisResult` table without a default value. This is not possible if the table is not empty.
  - Made the column `recommendations` on table `analysisresult` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `fileHash` to the `MalwareFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileSize` to the `MalwareFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileType` to the `MalwareFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `malwareType` to the `MalwareFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `MalwareFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `riskLevel` to the `MalwareFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedBy` to the `MalwareFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `analysischaracteristic` DROP FOREIGN KEY `AnalysisCharacteristic_analysis_id_fkey`;

-- DropForeignKey
ALTER TABLE `analysischaracteristic` DROP FOREIGN KEY `AnalysisCharacteristic_characteristic_id_fkey`;

-- DropForeignKey
ALTER TABLE `analysisreport` DROP FOREIGN KEY `AnalysisReport_analysis_id_fkey`;

-- DropForeignKey
ALTER TABLE `analysisresult` DROP FOREIGN KEY `AnalysisResult_analyst_id_fkey`;

-- DropForeignKey
ALTER TABLE `analysisresult` DROP FOREIGN KEY `AnalysisResult_malware_file_id_fkey`;

-- DropForeignKey
ALTER TABLE `analysisresult` DROP FOREIGN KEY `AnalysisResult_malware_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `malwarefile` DROP FOREIGN KEY `MalwareFile_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `recommendation` DROP FOREIGN KEY `Recommendation_analysis_id_fkey`;

-- DropIndex
DROP INDEX `AnalysisResult_analyst_id_fkey` ON `analysisresult`;

-- DropIndex
DROP INDEX `AnalysisResult_malware_file_id_fkey` ON `analysisresult`;

-- DropIndex
DROP INDEX `AnalysisResult_malware_type_id_fkey` ON `analysisresult`;

-- DropIndex
DROP INDEX `idx_analysis_date` ON `analysisresult`;

-- DropIndex
DROP INDEX `idx_analysis_risk` ON `analysisresult`;

-- DropIndex
DROP INDEX `MalwareFile_file_hash_key` ON `malwarefile`;

-- DropIndex
DROP INDEX `MalwareFile_user_id_fkey` ON `malwarefile`;

-- DropIndex
DROP INDEX `idx_file_hash` ON `malwarefile`;

-- DropIndex
DROP INDEX `idx_malware_status` ON `malwarefile`;

-- DropIndex
DROP INDEX `idx_malware_upload_date` ON `malwarefile`;

-- AlterTable
ALTER TABLE `analysisresult` DROP COLUMN `analysis_date`,
    DROP COLUMN `analyst_id`,
    DROP COLUMN `details`,
    DROP COLUMN `malware_file_id`,
    DROP COLUMN `malware_type_id`,
    DROP COLUMN `risk_level`,
    ADD COLUMN `analysisDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `analysisDetails` VARCHAR(191) NOT NULL,
    ADD COLUMN `detectedBehaviors` VARCHAR(191) NOT NULL,
    ADD COLUMN `malwareFileId` INTEGER NOT NULL,
    ADD COLUMN `resultStatus` ENUM('PENDING', 'ANALYZED', 'RESOLVED') NOT NULL,
    MODIFY `recommendations` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `malwarefile` DROP COLUMN `file_hash`,
    DROP COLUMN `file_size`,
    DROP COLUMN `file_type`,
    DROP COLUMN `filename`,
    DROP COLUMN `upload_date`,
    DROP COLUMN `user_id`,
    ADD COLUMN `fileHash` VARCHAR(191) NOT NULL,
    ADD COLUMN `fileSize` INTEGER NOT NULL,
    ADD COLUMN `fileType` VARCHAR(191) NOT NULL,
    ADD COLUMN `malwareType` ENUM('TROJAN', 'VIRUS', 'RANSOMWARE', 'SPYWARE', 'WORM') NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `riskLevel` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL,
    ADD COLUMN `uploadDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `uploadedBy` INTEGER NOT NULL,
    MODIFY `status` ENUM('PENDING', 'ANALYZED', 'RESOLVED') NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `created_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `analysischaracteristic`;

-- DropTable
DROP TABLE `analysisreport`;

-- DropTable
DROP TABLE `malwarecharacteristic`;

-- DropTable
DROP TABLE `malwaretype`;

-- DropTable
DROP TABLE `recommendation`;

-- DropTable
DROP TABLE `risklevel`;

-- CreateTable
CREATE TABLE `SystemLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MalwareTypeTable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `typeName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RiskLevelTable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `levelName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FileAction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `malwareFileId` INTEGER NOT NULL,
    `actionType` ENUM('DELETE', 'RESTORE') NOT NULL,
    `actionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reason` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `analysisResultId` INTEGER NOT NULL,
    `reportType` ENUM('PDF', 'CSV') NOT NULL,
    `reportPath` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Report_analysisResultId_key`(`analysisResultId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `AnalysisResult_malwareFileId_key` ON `AnalysisResult`(`malwareFileId`);

-- AddForeignKey
ALTER TABLE `MalwareFile` ADD CONSTRAINT `MalwareFile_uploadedBy_fkey` FOREIGN KEY (`uploadedBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnalysisResult` ADD CONSTRAINT `AnalysisResult_malwareFileId_fkey` FOREIGN KEY (`malwareFileId`) REFERENCES `MalwareFile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SystemLog` ADD CONSTRAINT `SystemLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FileAction` ADD CONSTRAINT `FileAction_malwareFileId_fkey` FOREIGN KEY (`malwareFileId`) REFERENCES `MalwareFile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_analysisResultId_fkey` FOREIGN KEY (`analysisResultId`) REFERENCES `AnalysisResult`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
