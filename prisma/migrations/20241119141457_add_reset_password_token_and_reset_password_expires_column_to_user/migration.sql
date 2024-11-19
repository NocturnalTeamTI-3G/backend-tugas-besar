-- AlterTable
ALTER TABLE `users` ADD COLUMN `resetPasswordExpires` DATETIME NULL,
    ADD COLUMN `resetPasswordToken` VARCHAR(100) NULL;
