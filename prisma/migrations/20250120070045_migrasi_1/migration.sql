-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MalwareType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `MalwareType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MalwareFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `file_hash` VARCHAR(191) NOT NULL,
    `file_size` INTEGER NOT NULL,
    `file_type` VARCHAR(191) NULL,
    `upload_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',

    UNIQUE INDEX `MalwareFile_file_hash_key`(`file_hash`),
    INDEX `idx_malware_upload_date`(`upload_date`),
    INDEX `idx_malware_status`(`status`),
    INDEX `idx_file_hash`(`file_hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MalwareCharacteristic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `MalwareCharacteristic_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnalysisResult` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `malware_file_id` INTEGER NOT NULL,
    `malware_type_id` INTEGER NOT NULL,
    `risk_level` VARCHAR(191) NOT NULL,
    `analysis_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `analyst_id` INTEGER NOT NULL,
    `details` VARCHAR(191) NULL,
    `recommendations` VARCHAR(191) NULL,

    INDEX `idx_analysis_date`(`analysis_date`),
    INDEX `idx_analysis_risk`(`risk_level`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnalysisCharacteristic` (
    `analysis_id` INTEGER NOT NULL,
    `characteristic_id` INTEGER NOT NULL,

    PRIMARY KEY (`analysis_id`, `characteristic_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RiskLevel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `color_code` VARCHAR(191) NULL,

    UNIQUE INDEX `RiskLevel_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnalysisReport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `analysis_id` INTEGER NOT NULL,
    `report_file_path` VARCHAR(191) NULL,
    `generated_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recommendation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `analysis_id` INTEGER NOT NULL,
    `action_required` VARCHAR(191) NULL,
    `priority` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MalwareFile` ADD CONSTRAINT `MalwareFile_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnalysisResult` ADD CONSTRAINT `AnalysisResult_malware_file_id_fkey` FOREIGN KEY (`malware_file_id`) REFERENCES `MalwareFile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnalysisResult` ADD CONSTRAINT `AnalysisResult_malware_type_id_fkey` FOREIGN KEY (`malware_type_id`) REFERENCES `MalwareType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnalysisResult` ADD CONSTRAINT `AnalysisResult_analyst_id_fkey` FOREIGN KEY (`analyst_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnalysisCharacteristic` ADD CONSTRAINT `AnalysisCharacteristic_analysis_id_fkey` FOREIGN KEY (`analysis_id`) REFERENCES `AnalysisResult`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnalysisCharacteristic` ADD CONSTRAINT `AnalysisCharacteristic_characteristic_id_fkey` FOREIGN KEY (`characteristic_id`) REFERENCES `MalwareCharacteristic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnalysisReport` ADD CONSTRAINT `AnalysisReport_analysis_id_fkey` FOREIGN KEY (`analysis_id`) REFERENCES `AnalysisResult`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recommendation` ADD CONSTRAINT `Recommendation_analysis_id_fkey` FOREIGN KEY (`analysis_id`) REFERENCES `AnalysisResult`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
