/*
  Warnings:

  - Added the required column `updated_at` to the `category_posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category_posts` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
