/*
  Warnings:

  - Added the required column `link_product` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `link_product` TEXT NOT NULL;
