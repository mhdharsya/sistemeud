/*
  Warnings:

  - The values [PENDING,ANALYZED,RESOLVED] on the enum `AnalysisResult_resultStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [DELETE,RESTORE] on the enum `FileAction_actionType` will be removed. If these variants are still used in the database, this will fail.
  - The values [PENDING,ANALYZED,RESOLVED] on the enum `AnalysisResult_resultStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [TROJAN,VIRUS,RANSOMWARE,SPYWARE,WORM] on the enum `MalwareFile_malwareType` will be removed. If these variants are still used in the database, this will fail.
  - The values [LOW,MEDIUM,HIGH] on the enum `MalwareFile_riskLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `analysisresult` MODIFY `resultStatus` ENUM('Pending', 'Analyzed') NOT NULL;

-- AlterTable
ALTER TABLE `fileaction` MODIFY `actionType` ENUM('Delete', 'Restore') NOT NULL;

-- AlterTable
ALTER TABLE `malwarefile` MODIFY `status` ENUM('Pending', 'Analyzed') NOT NULL,
    MODIFY `malwareType` ENUM('Trojan', 'Virus', 'Ransomware', 'Spyware', 'Worm') NOT NULL,
    MODIFY `riskLevel` ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL;
