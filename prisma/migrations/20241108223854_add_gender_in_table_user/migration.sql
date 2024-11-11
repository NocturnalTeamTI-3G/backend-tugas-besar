/*
  Warnings:

  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `gender` VARCHAR(10) NOT NULL,
    MODIFY `profile_img` TEXT NULL;
