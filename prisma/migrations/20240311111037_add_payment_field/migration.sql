/*
  Warnings:

  - Added the required column `payment` to the `salesdatas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `salesdatas` ADD COLUMN `payment` VARCHAR(255) NOT NULL;
