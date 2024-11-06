-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_role_id_fkey`;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;