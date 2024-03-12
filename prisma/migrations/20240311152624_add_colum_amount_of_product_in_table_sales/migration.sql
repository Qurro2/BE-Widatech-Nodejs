/*
  Warnings:

  - Added the required column `amount_of_product` to the `salesdatas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `salesdatas` ADD COLUMN `amount_of_product` INTEGER NOT NULL;
