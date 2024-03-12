/*
  Warnings:

  - Added the required column `notes` to the `salesdatas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `salesdatas` ADD COLUMN `notes` VARCHAR(10000) NOT NULL;
