/*
  Warnings:

  - You are about to drop the column `product_id` on the `history_scans` table. All the data in the column will be lost.
  - Added the required column `categoryProduct_id` to the `history_scans` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `history_scans` DROP FOREIGN KEY `history_scans_product_id_fkey`;

-- AlterTable
ALTER TABLE `history_scans` DROP COLUMN `product_id`,
    ADD COLUMN `categoryProduct_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `history_scans` ADD CONSTRAINT `history_scans_categoryProduct_id_fkey` FOREIGN KEY (`categoryProduct_id`) REFERENCES `category_products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
